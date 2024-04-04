import { STICKER_DATA } from '../Database/StickerData.js';
import { SET_DATA } from '../Database/SetData.js';

const CurrentAlbumNumber = '7';
let userData = {};
const FilterList = {};
let AndZeroOrOne = 0;
let DescendZeroAscendOne = 0;
const defaultValues = {
  id: "0",
  selected: "0",
  spare: "0",
  show: "1",
  havespare: "0",
  lookingfor: "0",
  fortrade: "0",
};

// Sets up the website
function init() {
  console.log('Hello world!');
  GenerateFilterSetButtons();   
  SetDefaultFilterStates();
  CreateNewUserData(STICKER_DATA);
  generateCurrentStickerBoard(STICKER_DATA, userData, 'current-sticker-board');  
  PerformSort({ currentTarget: document.querySelector('button[data-sort-type="GlobalID"]') });  
  NotSelectedByDefault();  
  UpdateTotalStickerQuantity();
  countSelectedStickers();
  countValveStickers();
  UpdateAlbumStartEndTime();
}


// Runs when loading the entire site for the first time
window.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loading-overlay');

  loadingOverlay.style.display = 'block';

  setTimeout(() => {loadingOverlay.style.display = 'none';}, 2000);
});

function SetDefaultFilterStates(){
  var FilterOptions = document.querySelectorAll('[data-filtervalue]');
  FilterOptions.forEach(item => {
    var filterDataAttribute = item.getAttribute('data-filtervalue');
    let FilterKey_Value = filterDataAttribute.split('>')[1];
    let FilterValue_Value = filterDataAttribute.split('>')[2];
    if(FilterValue_Value.includes('|')){FilterValue_Value = FilterValue_Value.split('|');}
    FilterList[filterDataAttribute] = {      
      inDatabase: filterDataAttribute.split('>')[0],
      FilterName: filterDataAttribute,
      FilterKey: FilterKey_Value,
      FilterValue: FilterValue_Value,
      FilterState: 0,
    };
  })
}

function generateCurrentStickerBoard(dataset, userData, targetParentElementID) {
  const stickerContainerSelector = `.sticker-card-container[data-global]`;
  const board = document.getElementById(targetParentElementID);

  const fragment = document.createDocumentFragment();

  for (const item of dataset.filter(item => item['GlobalID'] in userData)) {
    const userDataItem = userData[item['GlobalID']];
    const stickerCardContainer = document.querySelector(`${stickerContainerSelector}[data-global="${userDataItem.id}"]`);

    if (userDataItem.show === '0' && stickerCardContainer) {
      stickerCardContainer.remove();
    } else if (userDataItem.show === '1' && !stickerCardContainer) {
      const stickerElement = CreateStickerElement(item, 'sticker-card-container', 'sticker-card', true);
      
      fragment.appendChild(stickerElement);
    }
  }

  board.appendChild(fragment);
}

function CreateStickerElement(item, ContainerClass, ImageClass, isTracking) {
  const { StickerName, SetID, AlbumNo, GlobalID, AlbumName, Prestige, Golden, StickerRarity, ImageSource, Colour } = item;

  const StickerSet = SetID - AlbumNo * 100;
  const StickerSetPath = AlbumName;
  const StickerSetNo = GlobalID - SetID * 100

  let StickerNameClass = 'sticker-name';
  if (StickerName.length > 14) {StickerNameClass = 'sticker-name-long-min14';}
  if (StickerName.length > 18) {StickerNameClass = 'sticker-name-long-min18';}
  if (isBrighterThan(Colour, '#CCCCCC')) {StickerNameClass += '-dark';}

  let starIcon = 'Icon_Star.png';
  if (Prestige === '1') {starIcon = 'Icon_Star_Rainbow.png';}

  let isGold = '';
  if (Golden === '1') {isGold = '<img class="gold-frame" src="assets/stickers/BG_StickerSpecial.png">';}

  let starsHtml = '';
  for (let i = 0; i < StickerRarity; i++) {starsHtml += `<img class="star-img" src="assets/stickers/${starIcon}">`;}

  const container = document.createElement('div');
  container.dataset.global = GlobalID;
  container.classList.add(ContainerClass);

  container.innerHTML = `
    <div class="sticker-star-container">${starsHtml}</div><div class="sticker-photo-container"><img class="sticker-card" src="stickers/${StickerSetPath}/${ImageSource}">${isGold}</div><div class="${StickerNameClass}" style="background-color: ${Colour};">Set ${StickerSet}&nbsp;&nbsp;#${StickerSetNo}<br>${StickerName}</div>
  `;

  if(isTracking){
    appendSpareSpinner(container);
    appendTradeButtons(container);
    RestoreSelected(userData, container);
    RestoreStickerSpares(userData, container);
    RestoreTradeStates(userData, container);
  }
  return container;
}

function appendSpareSpinner(stickerElement) {
  const spareSpinnerContainer = document.createElement('div');
  spareSpinnerContainer.classList.add('spare-spinner-container');
  spareSpinnerContainer.innerHTML = `
    <div class="spare-field">
      <label for="SpareQuantity" class="spare-header">Spare:</label>
      <input type="number" id="SpareQuantity" class="spare-text" name="SpareQuantity" min="0" max="100" value="0"size="6">
    </div>
  `;
  stickerElement.appendChild(spareSpinnerContainer);
}

function appendTradeButtons(stickerElement) {
  const TradeButtonContainer = document.createElement('div');
  TradeButtonContainer.classList.add('trade-button-container');
  TradeButtonContainer.innerHTML = `
    <button class="btn lfft-btn" type="button" data-property="lookingfor">LF</button><button class="btn lfft-btn" type="button" data-property="fortrade">FT</button>
  `;
  stickerElement.appendChild(TradeButtonContainer);

  const buttons = TradeButtonContainer.querySelectorAll('.lfft-btn'); // Target buttons within TradeButtonContainer

  buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
      button.classList.add('scale-down');
    });
    button.addEventListener('mouseup', () => {
      button.classList.remove('scale-down');
    });
    button.addEventListener('mouseleave', () => {
      button.classList.remove('scale-down');
    });
    button.addEventListener('touchstart', () => {
      button.classList.add('scale-down');
    });
    button.addEventListener('touchend', () => {
      button.classList.remove('scale-down');
    });
    
    button.addEventListener('click', (event) => {
      const button = event.target.closest('.lfft-btn');
      var globalID = button.closest(".sticker-card-container").getAttribute("data-global");
      var property = button.getAttribute("data-property");
      if (button) {
        updateLFOrFTValue(globalID, property);
      }
    });
  });
}

function updateLFOrFTValue(globalID, property) {

  // Get the LF or FT button element based on the property value
  var button = document.querySelector(`[data-global="${globalID}"] .trade-button-container .btn[data-property="${property}"]`);

  if (button) {
    // Update the userData property value
    userData[globalID][property] = ((userData[globalID][property] + 1) % 2).toString();

    // Add or remove the .btnGreen class based on the updated value
    if (userData[globalID][property] === '1') {
      button.classList.add("btnGreen");
    } else {
      button.classList.remove("btnGreen");
    }
  }
}

// Add event listeners to LF and FT buttons
document.querySelectorAll(".trade-button-container .btn").forEach(function(button) {
  button.addEventListener("click", function() {
    var globalID = button.closest(".sticker-card-container").getAttribute("data-global");
    var property = button.getAttribute("data-property");

    updateLFOrFTValue(globalID, property);
  });
});


// Effects for ALL .btn buttons in the website
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('mousedown', () => {
    button.classList.add('scale-down');
  });
  button.addEventListener('mouseup', () => {
    button.classList.remove('scale-down');
  });
  button.addEventListener('mouseleave', () => {
    button.classList.remove('scale-down');
  });
  button.addEventListener('touchstart', () => {
    button.classList.add('scale-down');
  });
  button.addEventListener('touchend', () => {
    button.classList.remove('scale-down');
  });
});

const SortButtons = document.querySelectorAll('.sort-btn');
SortButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    PerformSort(event);
  });
});

function PerformSort(event) {
  const clickedButton = event.currentTarget;
  const toSortKey = clickedButton.dataset.sortType;

  const containers = Array.from(document.querySelectorAll('#current-sticker-board .sticker-card-container'));
  containers.sort((a, b) => {
    const aData = findStickerData(a.dataset.global);
    const bData = findStickerData(b.dataset.global);

    const aValue = aData[toSortKey];
    const bValue = bData[toSortKey];

    if (!isNaN(aValue) && !isNaN(bValue)) {
      const aNumericValue = parseFloat(aValue);
      const bNumericValue = parseFloat(bValue);
      if (aNumericValue === bNumericValue) {
        return compareStickerNames(aData, bData);
      } else {
        return aNumericValue - bNumericValue;
      }
    }

    if (aValue === bValue) {
      return compareStickerNames(aData, bData);
    } else {
      return aValue.localeCompare(bValue);
    }
  });

  const parentElement = containers[0].parentElement;
  containers.forEach(container => parentElement.appendChild(container));

  if (clickedButton.dataset.sortOnsite === 'selected') {
    PerformSortOnsite(clickedButton);
  }

  if (document.getElementById('SortOrderBtn').getAttribute('data-sort-direction') === 'descending') {
    handleSortOrderBtnClick();
  }

  const sortButtons = Array.from(document.querySelectorAll('.sort-btn'));
  sortButtons.forEach(button => button.classList.remove('btnBlue'));
  clickedButton.classList.add('btnBlue');
}

function findStickerData(globalId) {
  return STICKER_DATA.find(item => item['GlobalID'] === globalId);
}

function compareStickerNames(aData, bData) {
  const aName = aData['GlobalID'];
  const bName = bData['GlobalID'];
  return aName.localeCompare(bName);
}

function PerformSortOnsite(clickedSortBtn) {
  const containerSelector = '#current-sticker-board .sticker-card-container';
  const containers = document.querySelectorAll(containerSelector);
  const prioritizeClassToSort = clickedSortBtn.dataset.sortOnsite;

  if (prioritizeClassToSort === 'selected') {
    const selectedContainers = Array.from(containers).filter(container =>
      container.classList.contains('selected')
    );
    const notSelectedContainers = Array.from(containers).filter(container =>
      !container.classList.contains('selected')
    );

    const parentElement = containers[0].parentElement;
    selectedContainers.forEach(container => parentElement.appendChild(container));
    notSelectedContainers.forEach(container => parentElement.appendChild(container));
  }
}

function handleSortOrderBtnClick() {
  DescendZeroAscendOne = (DescendZeroAscendOne + 1) % 2;
  const containerSelector = '#sticker-board #current-sticker-board';
  const container = document.querySelector(containerSelector);
  const sortOrderBtnText = document.getElementById('SortOrderBtnText');

  if (DescendZeroAscendOne === 0) {sortOrderBtnText.textContent = 'Descending ⬇';} 
  else if (DescendZeroAscendOne === 1) {sortOrderBtnText.textContent = 'Ascending ⬆';}

  Array.from(container.children).reverse().forEach(child => {container.appendChild(child);});
}

const sortButtons = Array.from(document.querySelectorAll('.sort-btn'));
sortButtons.forEach(button => button.addEventListener('click', PerformSort));

document.getElementById('SortOrderBtn').addEventListener('click', handleSortOrderBtnClick);


// SEARCH BAR (Filter)
function FilterBySearchbar(GlobalID) {
  var searchbar = document.getElementById('filtermenu-searchbar');
  var filterName = searchbar.getAttribute('data-filtervalue');

  if (searchbar.value === '') {
    FilterList[filterName].FilterState = 0;
    userData[GlobalID].show = "1";
    updateClearFiltersButton();
    return;
  }

  var filterValue = searchbar.value.trim();

  if (filterValue.includes(',')) {
    filterValue = filterValue.split(',');
  } else {
    filterValue = [filterValue];
  }

  filterValue = filterValue.filter(function (value) {
    return value.trim() !== '';
  });

  if (FilterList.hasOwnProperty(filterName)) {
    FilterList[filterName].FilterValue = filterValue;
    FilterList[filterName].FilterState = filterValue.length > 0 ? 1 : 0;
  }

  var sticker = STICKER_DATA.find(function (item) {
    return item.GlobalID === GlobalID;
  });
  
  
  if (sticker) {
    var stickerName = sticker.StickerName.toLowerCase().replace(/é/g, 'e').replace(/ü/g, 'u');
    var lowercaseFilterValue = filterValue.map(function (value) {
      return value.toLowerCase().replace(/é/g, 'e');
    });
    
    if (filterValue.length === 1) {
      if (lowercaseFilterValue.some(function (value) {
        return stickerName.includes(value);
      })) {        
        userData[GlobalID].show = "1";
      } else {
        userData[GlobalID].show = "0";
      }
    } else if (filterValue.length > 1) {
      if(AndZeroOrOne === 0){
        if (lowercaseFilterValue.every(function (value) {
          return stickerName.includes(value);
        })) {
          userData[GlobalID].show = "1";
        } else {
          userData[GlobalID].show = "0";
        }
      }
      else if (AndZeroOrOne === 1){
        if (lowercaseFilterValue.some(function (value) {
          return stickerName.includes(value);
        })) {
          userData[GlobalID].show = "1";
          return;
        } else {
          userData[GlobalID].show = "0";
        }
      }
    }
  }
}

const searchbar = document.getElementById('filtermenu-searchbar');
searchbar.addEventListener('input', () => {PerformFilters();});

document.addEventListener('click', function (event) {
   if (event.target.id === 'ClearFilterMenuSearchBar') {
     document.getElementById('filtermenu-searchbar').value = '';
     PerformFilters();
   }
});

// FILTER (Filter)
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    ChangeFilterButtonState(button, true);
    PerformFilters();
  });
});

function ChangeFilterButtonState(ButtonElement, isThisBtnClicked) {
  if (isThisBtnClicked){
    FilterList[ButtonElement.dataset.filtervalue] = {
      ...FilterList[ButtonElement.dataset.filtervalue],
      FilterState: (FilterList[ButtonElement.dataset.filtervalue].FilterState + 1) % 3,
    };
  }
  ChangeFilterBtnStyle(ButtonElement);
};

function ChangeFilterBtnStyle(ButtonElement) {
  const filterState = FilterList[ButtonElement.dataset.filtervalue].FilterState;
  if (filterState === 0) { ButtonElement.classList.remove('btnRed', 'btnGreen'); }
  else if (filterState === 1) {ButtonElement.classList.add('btnGreen'); ButtonElement.classList.remove('btnRed'); }
  else if (filterState === 2) { ButtonElement.classList.add('btnRed'); ButtonElement.classList.remove('btnGreen'); }
}

// Function to update the filter lengths
function updateClearFiltersButton() {
  let filterLengthElement = 0;
  Object.values(FilterList).forEach(item => {
    if(item.FilterState !== 0){filterLengthElement++;}
  })
  document.getElementById('filterLength').textContent = filterLengthElement;
  ChangeClearFiltersButtonStyle();
}

function ChangeClearFiltersButtonStyle(){
  if (document.getElementById('filterLength').textContent > 0) {
    document.getElementById('ClearFiltersBtn').classList.add('btnRed');
  } else {
    document.getElementById('ClearFiltersBtn').classList.remove('btnRed');
  }
}


const clearFiltersBtn = document.getElementById('ClearFiltersBtn');
clearFiltersBtn.addEventListener('click', () => {clearFilters();})
function clearFilters() {  
  document.getElementById('filtermenu-searchbar').value = '';
  Object.values(FilterList).forEach(item => {
    if(item.FilterState !== 0 && item.FilterName !== '1>StickerName>'){
      item.FilterState = 0;
      const FilterBtnSource = document.querySelector(`.filter-btn[data-filtervalue="${item.FilterName}"]`);
      ChangeFilterButtonState(FilterBtnSource, false);
    }
  })
  PerformFilters();
}

document.getElementById('RefreshFiltersBtn').addEventListener('click', PerformFilters);

const AndOrFilterModeBtn = document.getElementById('AndOrFilterModeBtn');
AndOrFilterModeBtn.addEventListener('click', function () {
  const buttonText = document.getElementById('ClearFiltersBtnText');
  AndZeroOrOne = (AndZeroOrOne + 1) % 2;
  if (AndZeroOrOne === 1) {
    buttonText.textContent = 'Filter Mode: OR';
  } else {
    buttonText.textContent = 'Filter Mode: AND';
  }
  PerformFilters();
});

function PerformFilters() {
  for (var key in userData){
    userData[key].show = '1';    
    
    if(AndZeroOrOne === 0){
      FilterBySpareRange(FilterList, key);
      if(userData[key].show === "1"){
        FilterBySearchbar(key);
        if(userData[key].show === "1"){
          FilterByButtons(key);
        }
      }
    }else if (AndZeroOrOne === 1){
      FilterBySpareRange(FilterList, key);
      if(userData[key].show === "1"){
        FilterByButtons(key);
        if(IncludeStateFilters.length === 0 && ExcludeStateFilters.length === 0){
          userData[key].show = "0";
          if(document.getElementById('filtermenu-searchbar').value === ''){
            userData[key].show = "1";
          }
        }
        if((userData[key].show === "0" && document.getElementById('filtermenu-searchbar').value !== '')){
          FilterBySearchbar(key);
        }
      }
    }

  }
  if(document.getElementById('filtermenu-searchbar').value === ''){FilterList[document.getElementById('filtermenu-searchbar').getAttribute('data-filtervalue')].FilterState = 0;}
  updateClearFiltersButton();
  generateCurrentStickerBoard(STICKER_DATA, userData, 'current-sticker-board');
  PerformSort({ currentTarget: document.querySelector('.sort-btn.btnBlue') });
}

const DefaultStateFilters = [];
const IncludeStateFilters = [];
const ExcludeStateFilters = [];
function FilterByButtons(GlobalID){
  var sticker = STICKER_DATA.find(function (item) {return item.GlobalID === GlobalID;});
  DefaultStateFilters.length = 0;
  IncludeStateFilters.length = 0;
  ExcludeStateFilters.length = 0;

  for (const key in FilterList) {
    const filter = FilterList[key];

    if (
      filter.FilterName !== "1>StickerName>" &&
      filter.FilterName !== "0>spare>spare-filter-min|spare-filter-max"
      ){
          switch (filter.FilterState) {
            case 0:
              DefaultStateFilters.push(filter);
              break;
            case 1:
              IncludeStateFilters.push(filter);
              break;
            case 2:
              ExcludeStateFilters.push(filter);
              break;
            default:
              break;
            }
        }
    }
    if(IncludeStateFilters.length === 0 && ExcludeStateFilters.length === 0){
      userData[GlobalID].show = "1"; return;
    }
    
    // AND Mode
    if(AndZeroOrOne === 0){
      // Include Filter (AND)
      for (const filter of IncludeStateFilters) {
        var filterKeytemp = filter.FilterKey;
        if(filter.inDatabase === '0'){
          if(userData[GlobalID][filterKeytemp] !== filter.FilterValue){
            userData[GlobalID].show = "0";
          }
        } else if(filter.inDatabase === '1'){
          if(sticker[filterKeytemp] !== filter.FilterValue){
            userData[GlobalID].show = "0";
          }
        }
      }
      // Exclude Filter (AND)
      for (const filter of ExcludeStateFilters) {
        var filterKeytemp = filter.FilterKey;
        if(filter.inDatabase === '0'){
          if(userData[GlobalID][filterKeytemp] === filter.FilterValue){
            userData[GlobalID].show = "0";
          }
        } else if(filter.inDatabase === '1'){
          if(sticker[filterKeytemp] === filter.FilterValue){
            userData[GlobalID].show = "0";
          }
        }
      }
    }
    // OR Mode
    else if (AndZeroOrOne === 1){
      // Include Filter (OR)
      if(IncludeStateFilters.length > 0){      
        for (const filter of IncludeStateFilters) {
          var filterKeytemp = filter.FilterKey;
          if(filter.inDatabase === '0'){
            if(userData[GlobalID][filterKeytemp] === filter.FilterValue){
              userData[GlobalID].show = "1";
              return;
            } else{userData[GlobalID].show = "0";}
          } else if(filter.inDatabase === '1'){
            if(sticker[filterKeytemp] === filter.FilterValue){
              userData[GlobalID].show = "1";
              return;
            } else{userData[GlobalID].show = "0";}
          }
        }
      }
      // Exclude Filter (OR)
      if(userData[GlobalID].show === "0" || ExcludeStateFilters.length > 0){
        for (const filter of ExcludeStateFilters) {
          var filterKeytemp = filter.FilterKey;
          if(filter.inDatabase === '0'){
            if(userData[GlobalID][filterKeytemp] !== filter.FilterValue){
              userData[GlobalID].show = "1";
              return;
            } else {userData[GlobalID].show = "0"; return;}
          } else if(filter.inDatabase === '1'){
            if(sticker[filterKeytemp] !== filter.FilterValue){
              userData[GlobalID].show = "1";
              return;
            } else {userData[GlobalID].show = "0"; return;}
          }
        }
      }
    }
}


function handleExpandBtnIconClick() {
  const btnGroupTitles = document.getElementsByClassName('btn-grp-title');
  Array.from(btnGroupTitles).forEach(btnGroupTitle => {
    btnGroupTitle.addEventListener('click', (event) => {
      const expandBtnIcon = event.currentTarget.querySelector('.ExpandBtnIcon');
      const currentSrc = expandBtnIcon.getAttribute('src');
      const upwardsArrowFilename = 'UpwardsArrow.png';
      const downwardsArrowFilename = 'DownwardsArrow.png';
      const currentFilename = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);
      if (currentFilename === upwardsArrowFilename) {
        expandBtnIcon.src = currentSrc.replace(upwardsArrowFilename, downwardsArrowFilename);
      } else if (currentFilename === downwardsArrowFilename) {
        expandBtnIcon.src = currentSrc.replace(downwardsArrowFilename, upwardsArrowFilename);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  handleExpandBtnIconClick();
});

document.addEventListener('click', event => {
  const target = event.target;
  const parentContainer = target.closest('.sticker-card-container');
  if (parentContainer && target.classList.contains('sticker-card')) {
    parentContainer.classList.toggle('selected');
    parentContainer.classList.toggle('not-selected');
    UpdateCurrentAlbumStickerStates(parentContainer.getAttribute('data-global'));
    ToggleSpareClass(userData, parentContainer);
    countSelectedStickers();
  }
});

function NotSelectedByDefault() {
  const containers = document.querySelectorAll('.sticker-card-container');
  containers.forEach(container => {
      container.classList.add('not-selected');
    });
}

const btnGroupTitles = document.querySelectorAll('.btn-grp-title');

btnGroupTitles.forEach(btnGroupTitle => {
  btnGroupTitle.addEventListener('click', () => {
    const parentContainer = btnGroupTitle.parentElement;
    const filterBtnSubgroup = parentContainer.querySelectorAll('.btn-subgroup');
    filterBtnSubgroup.forEach(element => {
      element.classList.toggle('hidden');
    });
  });
});


const stickerContainer = document.getElementById('current-sticker-board');
stickerContainer.addEventListener('input', function(event) {
  const target = event.target;
  const clickedStickerContainer = target.closest('.sticker-card-container');
  if (target.classList.contains('spare-text') && clickedStickerContainer) {
    target.value = target.value.replace(/^0+(?=\d)/, '');
    const dataGlobal = clickedStickerContainer.getAttribute('data-global');
    if (target.value > 100) {
      if (target.value.slice(0, -1) === '100') {
        target.value = '100';
      } else {
        target.value = target.value.slice(0, 2);
      }
    } else if (target.value < 0 || target.value === '') {
      target.value = 0;
    }
    if (target.value > 0) {
      if (!clickedStickerContainer.classList.contains('selected')) {
        clickedStickerContainer.classList.add('selected');
        clickedStickerContainer.classList.remove('not-selected');
        userData[dataGlobal].selected = '1';
      }
    }
    
    UpdateCurrentAlbumStickerStates(dataGlobal);
    ToggleSpareClass(userData, clickedStickerContainer);
    countValveStickers();
  }
});

const minFilterInput = document.getElementById('spare-filter-min');
const maxFilterInput = document.getElementById('spare-filter-max');

minFilterInput.addEventListener('input', handleFilterInput);
maxFilterInput.addEventListener('input', handleFilterInput);

function handleFilterInput(event) {
  const target = event.target;
  if (target.classList.contains('spare-filter-text')) {
    target.value = target.value.replace(/^0+(?=\d)/, '');
    if (target.value > 100) {
      if (target.value.slice(0, -1) === '100') {
        target.value = '100';
      } else {
        target.value = target.value.slice(0, 2);
      }
    } else if (target.value < 0 || target.value === '') {
      target.value = 0;
    }
  }
}

const SpareFilterBtn = document.getElementById('spare-filter-btn');
minFilterInput.addEventListener('mouseleave', SwapSpareFilterMinMax);
maxFilterInput.addEventListener('mouseleave', SwapSpareFilterMinMax);
function SwapSpareFilterMinMax(event) {
  if (parseInt(minFilterInput.value) > parseInt(maxFilterInput.value)) {
    let min = maxFilterInput.value;
    let max = minFilterInput.value;
    minFilterInput.value = min;
    maxFilterInput.value = max;
  }
}
SpareFilterBtn.addEventListener('click', () => {
  SwapSpareFilterMinMax();
  PerformFilters();
});


function UpdateCurrentAlbumStickerStates(StickerGlobalID) {
  const stickerElement = document.querySelector(`.sticker-card-container[data-global="${StickerGlobalID}"]`);
  const selected = stickerElement.classList.contains('not-selected') ? '0' : '1';
  const spareValue = stickerElement.querySelector('.spare-text').value;
  userData[StickerGlobalID] = {
    ...userData[StickerGlobalID],
    selected: selected,
    spare: spareValue
  };
}

function CreateNewUserData(dataset) {
  dataset
    .filter(item => item['AlbumNo'] === CurrentAlbumNumber)
    .forEach(item => {
      const userDataItem = { ...defaultValues, id: item['GlobalID'] };
      userData[item['GlobalID']] = userDataItem;
    });
}


function FilterBySpareRange(FilterList, GlobalID) {
  const filterKey = "0>spare>spare-filter-min|spare-filter-max";
  const filterData = FilterList[filterKey];

  if (filterData && filterData.FilterState === 0) {
    userData[GlobalID].show = "1";
    return;
  }

  const [minKey, maxKey] = filterData.FilterValue;
  const minValue = parseInt(document.getElementById(minKey).value, 10);
  const maxValue = parseInt(document.getElementById(maxKey).value, 10);

  const invertFilter = filterData.FilterState === 2;

  const spareValue = parseInt(userData[GlobalID].spare, 10);

  if (spareValue >= minValue && spareValue <= maxValue) {
    userData[GlobalID].show = invertFilter ? "0" : "1";
  } else {
    userData[GlobalID].show = invertFilter ? "1" : "0";
  }
  return;
}

function RestoreStickerSpares(userData, StickerContainer) {
  const dataGlobalValue = StickerContainer.getAttribute('data-global');
  const stickerData = userData[dataGlobalValue];
  const spareValue = stickerData.spare;
  StickerContainer.querySelector('.spare-text').value = spareValue;
}

function RestoreSelected(userData, StickerContainer) {
  
  const dataGlobalValue = StickerContainer.getAttribute('data-global');
  const stickerData = userData[dataGlobalValue];
  const selectedValue = stickerData.selected;

  StickerContainer.classList.toggle('selected', selectedValue === '1');
  StickerContainer.classList.toggle('not-selected', selectedValue === '0');
}

function RestoreTradeStates(userData, StickerContainer) {
  const dataGlobalValue = StickerContainer.getAttribute('data-global');
  const stickerData = userData[dataGlobalValue];
  //const LFValue = stickerData.lookingfor;
  //const FTValue = stickerData.fortrade;
  if (stickerData.lookingfor === '1') {
    StickerContainer.querySelector(`.trade-button-container .btn[data-property="lookingfor"]`).classList.add("btnGreen");
  }
  if (stickerData.fortrade === '1') {
    StickerContainer.querySelector(`.trade-button-container .btn[data-property="lookingfor"]`).classList.add("btnGreen");
  }
}

function updateProgressBar() {
  var progressContainers = document.querySelectorAll(".progress-container");

  progressContainers.forEach(function(container) {
    var progressText = container.querySelector(".progress-text").textContent;
    var progressValue = parseInt(progressText.split(" / ")[0]);
    var totalValue = parseInt(progressText.split(" / ")[1]);

    var progressPercentage = (progressValue / totalValue) * 100;

    var progressBar = container.querySelector(".progress-bar");
    progressBar.style.width = progressPercentage + "%";
  });
}

function GenerateFilterSetButtons() {
  const filterBtnSubgroup = document.querySelector('#stickerset-filter .btn-subgroup');
  const setProgressTracker = document.querySelector('#set-progress-tracker');

  SET_DATA.forEach((set) => {
    if (set.AlbumNo === CurrentAlbumNumber) {
      const SetID = set.SetID;
      const SetColour = set.Colour;
      const SetNo = parseInt(SetID) - parseInt(set.AlbumNo) * 100;
      const SetName = set.SetName;
      const SetImgSrc =  `Icon_${SetID}.png`;
      const SetTotalStickers = STICKER_DATA.filter(sticker => sticker.SetID === SetID).length;
      
      let ButtonElement = `
        <button data-filtervalue="1>SetID>${SetID}" class="filter-btn btn" type="button">Set ${SetNo}</button>
      `;
      filterBtnSubgroup.innerHTML += ButtonElement;

      let SetNameClass = 'set-name';
      if (SetName.length > 15) {SetNameClass = 'set-name-long-min15';}
      if (isBrighterThan(SetColour, '#CCCCCC')) {SetNameClass += '-dark';}
      const SetCardContainerElement = `
        <div class="set-card-container"><img class="set-logo" src="logo/${SetImgSrc}" onerror="this.onerror=null;this.src='logo/Icon_Placeholder.png';"><div class="${SetNameClass}" style="background-color: ${SetColour};">Set ${SetNo}<br>${SetName}</div><div class="progress-container"><div class="progress-bar"></div><div class="progress-text"><span data-setid="${SetID}">0</span> / ${SetTotalStickers}</div></div></div>
      `;

      setProgressTracker.innerHTML += SetCardContainerElement;
    }
  });
  const buttons = filterBtnSubgroup.querySelectorAll('.filter-btn');

  buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
      button.classList.add('scale-down');
    });
    button.addEventListener('mouseup', () => {
      button.classList.remove('scale-down');
    });
    button.addEventListener('mouseleave', () => {
      button.classList.remove('scale-down');
    });
    button.addEventListener('touchstart', () => {
      button.classList.add('scale-down');
    });
    button.addEventListener('touchend', () => {
      button.classList.remove('scale-down');
    });

    button.addEventListener('click', (event) => {
      const button = event.target.closest('.filter-btn');
      if (button) {
        ChangeFilterButtonState(button, true);
        PerformFilters();
      }
    });
  });
}

const importBtn = document.querySelector('#import-btn');
const importFromFileBtn = document.querySelector('#import-from-file-btn');
const exportBtn = document.querySelector('#export-btn');
const exportFromFileBtn = document.querySelector('#export-from-file-btn');
const textArea = document.querySelector('.backup-area');



function exportUserData() {
  // Check for missing keys and add default values
  Object.keys(userData).forEach(key => {
    userData[key] = { ...defaultValues, ...userData[key] };
  });

  // Convert userData to string
  const userDataString = JSON.stringify(userData, null, 2);
  textArea.value = userDataString;
}

function importUserData(userDataString) {
  if (userDataString === '') {
    console.error('Textarea value is empty.');
    return;
  }

  let parsedData;
  try {
    parsedData = JSON.parse(userDataString);

    // Check for missing keys and add default values
    Object.keys(parsedData).forEach(key => {
      parsedData[key] = { ...defaultValues, ...parsedData[key] };
    });

    userData = parsedData;
    console.log('Successfully imported userData:', userData);
    clearFilters();
    const containers = document.querySelectorAll('.sticker-card-container');
    containers.forEach(container => {  
      RestoreSelected(userData, container);
      RestoreStickerSpares(userData, container);
      RestoreTradeStates(userData, container);
      ToggleSpareClass(userData, container);
      countSelectedStickers();
      countValveStickers();
    });
  } catch (error) {
    console.error('Invalid JSON format:', error);
    return;
  }

  if (typeof userData === 'object' && !Array.isArray(userData)) {
    console.log('Successfully imported userData:', userData);
  } else {
    console.error('Invalid userData format. Expected an object.');
  }
}

importBtn.addEventListener('click', () => {
  const userDataString = textArea.value.trim();
  importUserData(userDataString);
});

importFromFileBtn.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.txt';
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const userDataString = event.target.result.trim();
      textArea.value = userDataString;
      importUserData(userDataString);
    };
    reader.readAsText(file);
  });
  fileInput.click();
});



exportBtn.addEventListener('click', exportUserData);

exportFromFileBtn.addEventListener('click', () => {
  exportUserData();
  const blob = new Blob([textArea.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'userData.txt';
  link.click();
});

function UpdateTotalStickerQuantity() {
  const totalStickersQuantity = document.querySelector('#total-stickers-quantity');
  let count = 0;
  STICKER_DATA.forEach((sticker) => {
    if (sticker.AlbumNo === CurrentAlbumNumber) {count++;}
  })
  totalStickersQuantity.textContent = count.toString();
}

function countSelectedStickers() {
  const userStickersQuantity = document.querySelector('#user-stickers-quantity');

  const setDuplicates = new Map();
  const setSpans = Array.from(document.querySelectorAll('[data-setid]'));

  // Reset each data-setid value to zero
  setSpans.forEach(setSpan => {
    setSpan.textContent = "0";
  });

  for (const key in userData) {
    if (userData.hasOwnProperty(key) && userData[key].selected === "1") {
      const setId = Math.floor(userData[key].id / 100);

      if (setDuplicates.has(setId)) {
        setDuplicates.set(setId, setDuplicates.get(setId) + 1);
      } else {
        setDuplicates.set(setId, 1);
      }
    }
  }

  let count = 0;
  for (const [setId, setCount] of setDuplicates) {
    const setSpan = setSpans.find(span => span.getAttribute('data-setid') === setId.toString());
    if (setSpan) {
      setSpan.textContent = (parseInt(setSpan.textContent, 10) + setCount).toString();
    }
    count += setCount;
  }

  userStickersQuantity.textContent = count.toString();
  updateProgressBar();
}

function countValveStickers() {
  const totalValveQuantity = document.querySelector('#total-valve-quantity');

  let valveQuantity = 0;

  for (const key in userData) {
    if (userData.hasOwnProperty(key) && parseInt(userData[key].spare) > 0) {
      const globalId = userData[key].id;
      const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);

      if (stickerData) {
        const spareQuantity = parseInt(userData[key].spare);
        const stickerRarity = parseInt(stickerData.StickerRarity);
        const isPrestige = parseInt(stickerData.Golden);
        if(isPrestige === 1){valveQuantity += spareQuantity * stickerRarity * 2}
        else {valveQuantity += spareQuantity * stickerRarity;}
      }
    }
  }

  totalValveQuantity.textContent = valveQuantity.toString();
}


function ToggleSpareClass(userData, StickerContainer){
  const dataGlobalValue = StickerContainer.getAttribute('data-global');
  if(parseInt(userData[dataGlobalValue].selected) === 1 && parseInt(userData[dataGlobalValue].spare) > 0){
    userData[dataGlobalValue].havespare = '1';
  } else{userData[dataGlobalValue].havespare = '0';}
}

function UpdateAlbumStartEndTime() {
  const AlbumIconElement = document.getElementById('album-logo-container');
  AlbumIconElement.innerHTML = `<img class="album-logo" src="logo/album_${CurrentAlbumNumber}.png">`;
  
  const startTimeSpan = document.querySelector('#start-time');
  const endTimeSpan = document.querySelector('#end-time');

  let earliestStartTime = Infinity;
  let earliestEndTime = Infinity;

  SET_DATA.forEach((set) => {
    if (set.AlbumNo === CurrentAlbumNumber) {
      const startTime = parseInt(set.StartTime);
      const endTime = parseInt(set.EndTime);

      if (startTime < earliestStartTime) {
        earliestStartTime = startTime;
      }

      if (endTime < earliestEndTime) {
        earliestEndTime = endTime;
      }
    }
  });

  const startDateTime = new Date(earliestStartTime * 1000);
  const endDateTime = new Date(earliestEndTime * 1000); 

  const startFormattedTime = startDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const endFormattedTime = endDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  startTimeSpan.textContent = startFormattedTime;
  endTimeSpan.textContent = endFormattedTime;
}

function isBrighterThan(color1, color2) {
  const brightness1 = calculateBrightness(color1);
  const brightness2 = calculateBrightness(color2);
  return brightness1 > brightness2;
}

function calculateBrightness(color) {
  const hex = color.slice(1);
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness;
}

function copyToCollectionScreenshot() {
  var middleSide = document.getElementById("middle-side");
  var collectionScreenshot = document.getElementById("collection-screenshot");

  if (middleSide && collectionScreenshot) {
    collectionScreenshot.innerHTML = "";
    var clonedContents = middleSide.innerHTML;
    collectionScreenshot.style.width = "6000px";
    collectionScreenshot.setAttribute("style", middleSide.getAttribute("style"));
    clonedContents = clonedContents.replace(/sticker-card-container/g, "sticker-card-container-screenshot");
    collectionScreenshot.innerHTML = clonedContents;
    var screenshotContainers = collectionScreenshot.querySelectorAll(".sticker-card-container-screenshot");
    screenshotContainers.forEach(function(container) {
      var globalID = container.getAttribute("data-global");
      var spanElement = document.createElement("span");
      spanElement.className = "spare-text-screenshot";
      spanElement.textContent = userData[globalID].spare;
      var spareTextElement = container.querySelector(".spare-text");
      if (spareTextElement) {
        spareTextElement.parentNode.replaceChild(spanElement, spareTextElement);
      }
    });
  } else {
    console.log("Either middle-side or collection-screenshot element is not found.");
  }
}

function captureScreenshot() {
  var collectionScreenshot = document.getElementById("collection-screenshot");

  if (collectionScreenshot) {
    window.devicePixelRatio = 2;
    html2canvas(collectionScreenshot, { scale: 2 });
    html2canvas(collectionScreenshot).then(function(canvas) {
      var dataURL = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.href = dataURL;
      link.download = "collection-screenshot.png";
      link.click();
    });
  } else {
    console.log("collection-screenshot element is not found.");
  }
}

var dlPngButton = document.getElementById("dl-png");
if (dlPngButton) {
  dlPngButton.addEventListener("click", function() {
    copyToCollectionScreenshot();
    captureScreenshot();
    document.getElementById("collection-screenshot").innerHTML = "";
  });
}

window.onload = init;
