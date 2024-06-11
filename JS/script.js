import { STICKER_DATA } from "../Database/StickerData.js";
import { SET_DATA } from "../Database/SetData.js";
import { ALBUM_DATA } from "../Database/AlbumData.js";
import { NEWS_DATA } from "../Database/NewsData.js";
import { LANGUAGE_DICTIONARY } from "../Database/LanguageDictionary.js";

const CurrentAlbumNumber = "7";
const VaultTierOne = 250;
const VaultTierTwo = 500;
const VaultTierThree = 800;
let userData = {};
//let BackupuserData = {};
const FilterList = {};

// SETTINGS VARIABLE
// let AlbumCurrentZeroAllOne = 0;
let AndZeroOrOne = 0;
let AscendZeroDescendOne = 0;
let IgnorePrestige = 0;
let WebZeroMobileOne = 0;
let LightZeroDarkOne = 0;
let ImgOrientationLandscapeZeroPortraitOne = 0;
let StickerSelectedZeroShowOneBack = 0;
let CurrentLanguageCode = 'EN';

const defaultValues = {
  id: "0",
  selected: 0,
  spare: 0,
  show: 1,
  havespare: 0,
  lookingfor: 0,
  fortrade: 0,
  // heartvalue: 0,
};
const FullAlbumValues = {
  id: "0",
  show: 1,
}

// Sets up the website
function init() {
  compareViewport();
  //console.log("Hello world!");    
  GenerateFilterSetButtons();
  SetDefaultFilterStates();
  document.querySelector(`button[data-translation-pointer= ${CurrentLanguageCode}]`).click();
  //translateOnLoad(CurrentLanguageCode);

  // Check if userData exists in localStorage
  const LocaluserData = localStorage.getItem("userData");
  if (LocaluserData) {
    importUserData(LocaluserData);
    textArea.value = LocaluserData;
  } else {
    CreateNewUserData(STICKER_DATA);
  }
  generateCurrentStickerBoard(STICKER_DATA, userData, "current-sticker-board");
  PerformSort({ currentTarget: document.querySelector("button[data-sort-type='GlobalID']") });
  NotSelectedByDefault();

  UpdateTotalStickerQuantity();
  UpdateTotalStickerByRarityQuantity();

  countSelectedStickers();
  countVaultStickers();
  //updateProgressBar();

  handleBasicMenuNavigationClick({ target: document.getElementById("BasicMenuNewsBtn") });

  setTimeout(() => {LoadNews();}, 1500);
  
  UpdateAlbumStartEndTime();  
  // compareViewport();
}

// Runs when loading the entire site for the first time
window.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.display = "block";
  setTimeout(() => { loadingOverlay.style.display = "none"; }, 2000);
});

function SetDefaultFilterStates() {
  var FilterOptions = document.querySelectorAll("[data-filtervalue]");
  FilterOptions.forEach(item => {
    var filterDataAttribute = item.getAttribute("data-filtervalue");
    let FilterKey_Value = filterDataAttribute.split(">")[1];
    let FilterValue_Value = filterDataAttribute.split(">")[2];
    if (FilterValue_Value.includes("|")) { FilterValue_Value = FilterValue_Value.split("|"); }
    FilterList[filterDataAttribute] = {
      inDatabase: filterDataAttribute.split(">")[0],
      FilterName: filterDataAttribute,
      FilterKey: FilterKey_Value,
      FilterValue: FilterValue_Value,
      FilterState: 0,
    };
  })
}

function CreateNewUserData(dataset) {
  dataset
    .filter(item => item["AlbumNo"] === CurrentAlbumNumber)
    .forEach(item => {
      const userDataItem = { ...defaultValues, id: item["GlobalID"] };
      userData[item["GlobalID"]] = userDataItem;
    });
}

function NotSelectedByDefault() {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach(container => {
    if (!container.classList.contains("selected")) {
      container.classList.add("not-selected");
    }
    ApplySelectedStyle(container);
  });
}

function generateCurrentStickerBoard(dataset, userData, targetParentElementID) {

  const stickerContainerSelector = `.sticker-card-container[data-global]`;
  const board = document.getElementById(targetParentElementID);

  const fragment = document.createDocumentFragment();

  for (const item of dataset.filter(item => item["GlobalID"] in userData)) {
    const userDataItem = userData[item["GlobalID"]];
    const globalId = userDataItem.id;

    const stickerCardContainer = document.querySelector(`${stickerContainerSelector}[data-global="${globalId}"]`);

    const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);
    if (IgnorePrestige === 1 && stickerData.Prestige === "1") {
      if (stickerCardContainer) { stickerCardContainer.remove(); }
      continue;
    }

    else {
      if ((userDataItem.show === 0 && stickerCardContainer)) {
        stickerCardContainer.remove();
      } else if (userDataItem.show === 1) {
        if (stickerCardContainer) {
          //console.log(stickerCardContainer.innerHTML);
          ApplySelectedStyle(stickerCardContainer);
        } else {
          if (!stickerCardContainer) {
            const stickerElement = CreateStickerElement(item, "sticker-card-container", "sticker-card", true);
            fragment.appendChild(stickerElement);
          }
        }
      }
    }
  }
  board.appendChild(fragment);
}

function CreateStickerElement(item, ContainerClass, ImageClass, isTracking) {
  const { SetID, AlbumNo, GlobalID, AlbumName, Golden, StickerRarity, ImageSource, Colour } = item;

  const StickerName = item[`StickerName${CurrentLanguageCode}`];

  const StickerSet = SetID - AlbumNo * 100;
  const StickerSetPath = AlbumName;
  const StickerSetNo = GlobalID - SetID * 100;
  const DarkenedColour = DarkenColour(Colour, 15);
  const RibbonEdgeColour = DarkenColour(Colour, 5);

  let StickerNameClass = "sticker-name";
  if (StickerName.length > 14) { StickerNameClass = "sticker-name-long-min14"; }
  if (StickerName.length > 18) { StickerNameClass = "sticker-name-long-min18"; }
  if (isBrighterThan(Colour, "#CCCCCC")) { StickerNameClass += "-dark"; }

  let FrameHTML = "";
  if (Golden === "1") { FrameHTML = `<img draggable="false" class="gold-frame" src="assets/stickers/BG_StickerSpecial.png">`; }
  else { FrameHTML = `<img draggable="false" class="normal-frame" src="assets/stickers/BG_StickerBasic.png">`; }

  const container = document.createElement("div");
  container.dataset.global = GlobalID;
  container.classList.add(ContainerClass);
  const SetText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "set")[CurrentLanguageCode];
  container.innerHTML = `
    <div class="sticker-structure-container"><div class="sticker-star-container"><img draggable="false" class="star-img" src="assets/stickers/Collections_Star_${StickerRarity}Star.png"></div><div class="sticker-photo-container"><img draggable="false" class="${ImageClass}" src="stickers/${StickerSetPath}/${ImageSource}">${FrameHTML}</div><div class="sticker-ribbon" style="background: ${RibbonEdgeColour}; background: -moz-linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${Colour} 10%, ${Colour} 90%, ${RibbonEdgeColour} 100%); background: -webkit-linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${Colour} 10%, ${Colour} 90%, ${RibbonEdgeColour} 100%); background: linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${Colour} 10%, ${Colour} 90%, ${RibbonEdgeColour} 100%); border: 2px solid ${DarkenedColour};"><span class="${StickerNameClass}"><span><span data-translation-key="set">${SetText}</span>&nbsp;${StickerSet}&nbsp;&nbsp;#${StickerSetNo}</span><span class="StickerNameText" data-stickerid="${GlobalID}"></span></span></div></div></div>
  `;
  if (isTracking) {
    //appendHeartButtons(container);
    appendSpareSpinner(container);
    appendTradeButtons(container);
    RestoreSelected(userData, container);
    RestoreStickerSpares(userData, container);
    RestoreTradeStates(userData, container);
  }
  return container;
}

function ApplySelectedStyle(container) {
  const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === container.getAttribute("data-global"));
  const StickerName = stickerData[`StickerName${CurrentLanguageCode}`];
  const userDataItem = userData[stickerData.GlobalID];
  const StickerStructureContainer = container.querySelector('.sticker-structure-container');

  const StickerSet = stickerData.SetID - stickerData.AlbumNo * 100;
  const StickerSetPath = stickerData.AlbumName;
  const StickerSetNo = stickerData.GlobalID - stickerData.SetID * 100;
  const DarkenedColour = DarkenColour(stickerData.Colour, 15);
  const RibbonEdgeColour = DarkenColour(stickerData.Colour, 5);

  let StickerNameClass = "sticker-name";
  if (StickerName.length > 14) { StickerNameClass = "sticker-name-long-min14"; }
  if (StickerName.length > 18) { StickerNameClass = "sticker-name-long-min18"; }
  if (isBrighterThan(stickerData.Colour, "#CCCCCC")) { StickerNameClass += "-dark"; }

  let FrameHTML = "";
  if (stickerData.Golden === "1") { FrameHTML = `<img draggable="false" class="gold-frame" src="assets/stickers/BG_StickerSpecial.png">`; }
  else { FrameHTML = `<img draggable="false" class="normal-frame" src="assets/stickers/BG_StickerBasic.png">`; }

  //const spareSpinnerHTML = container.querySelector('.spare-spinner-container').outerHTML;
  //const tradeButtonHTML = container.querySelector('.trade-button-container').outerHTML;
  const SetText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "set")[CurrentLanguageCode];

  StickerStructureContainer.innerHTML = `
    <div class="sticker-star-container"><img draggable="false" class="star-img" src="assets/stickers/Collections_Star_${stickerData.StickerRarity}Star.png"></div>
    <div class="sticker-photo-container"><img draggable="false" class="sticker-card" src="stickers/${StickerSetPath}/${stickerData.ImageSource}">${FrameHTML}</div>
    <div class="sticker-ribbon" style="background: ${RibbonEdgeColour}; background: -moz-linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${stickerData.Colour} 10%, ${stickerData.Colour} 90%, ${RibbonEdgeColour} 100%); background: -webkit-linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${stickerData.Colour} 10%, ${stickerData.Colour} 90%, ${RibbonEdgeColour} 100%); background: linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${stickerData.Colour} 10%, ${stickerData.Colour} 90%, ${RibbonEdgeColour} 100%); border: 2px solid ${DarkenedColour};"><span class="${StickerNameClass}"><span><span data-translation-key="set">${SetText}</span>&nbsp;${StickerSet}&nbsp;&nbsp;#${StickerSetNo}</span><span class="StickerNameText" data-stickerid="${stickerData.GlobalID}"></span></span>
    </div>
  `;

  if (userDataItem.selected === 0 && StickerSelectedZeroShowOneBack === 0) {
    container.style.opacity = '0.4';
  } else if (userDataItem.selected === 1 && StickerSelectedZeroShowOneBack === 0) {
    container.style.opacity = '1.0';
  }  
  container.style.transition = '0.1s';

  if (userDataItem.selected === 0 && StickerSelectedZeroShowOneBack === 1) {
    container.style.opacity = '1.0';
    let StickerWhenNotSelected = "";
    if (stickerData.Golden === "1") { StickerWhenNotSelected = `assets/stickers/CardBack_Special.png`; }
    else { StickerWhenNotSelected = `assets/stickers/CardBack_Basic.png`; }

    StickerStructureContainer.innerHTML = `
      <div class="sticker-star-container"><img draggable="false" class="star-img" src="assets/stickers/Collections_Star_${stickerData.StickerRarity}Star_Grey.png"></div>
      <div class="sticker-photo-container"><img draggable="false" class="sticker-card" src="${StickerWhenNotSelected}"></div><div class="sticker-ribbon-transparent"><span class="${StickerNameClass}" style="color: #9a9381;"><span><span data-translation-key="set">${SetText}</span>&nbsp;${StickerSet}&nbsp;&nbsp;#${StickerSetNo}</span><span class="StickerNameText" data-stickerid="${stickerData.GlobalID}"></span></span></div>
    `;
  }
  TranslateStickerName(container, CurrentLanguageCode);

  //container.insertAdjacentHTML('beforeend', spareSpinnerHTML);
  //container.insertAdjacentHTML('beforeend', tradeButtonHTML);

  //RestoreStickerSpares(userData, container);
  //RestoreTradeStates(userData, container);
  if(StickerSelectedZeroShowOneBack === 0){
      container.querySelector('.spare-spinner-container').style.marginTop = '5.5px';
      //if(WebZeroMobileOne === 1 && userDataItem.selected === 0){container.querySelector('.sticker-ribbon-transparent').style.marginTop = '-91px';}
  }
  else if (StickerSelectedZeroShowOneBack === 1) {
    //if(WebZeroMobileOne === 1){container.querySelector('.spare-spinner-container').style.marginTop = '56px';}
    if(WebZeroMobileOne === 0){
      if(userDataItem.selected === 0){
        // container.querySelector('.sticker-ribbon-transparent').style.marginTop = '-90px';
        container.querySelector('.spare-spinner-container').style.marginTop = '55px';
      }
      else{container.querySelector('.spare-spinner-container').style.marginTop = '6.5px';}      
    }
    else if(WebZeroMobileOne === 1){            
      if(userDataItem.selected === 0){
        container.querySelector('.sticker-ribbon-transparent').style.marginTop = '-5.4rem';
        container.querySelector('.spare-spinner-container').style.marginTop = '3.29rem';
      }
      else{container.querySelector('.spare-spinner-container').style.marginTop = '0.34rem';}
    }
  }
      //container.querySelector('.sticker-ribbon-transparent').style.marginTop = '-91px';
}

function appendHeartButtons(stickerElement) {
  const heartElementHTML = `
  <div class="heart-btn-container">
    <img class="heart-menu-btn heart-img" src="assets/hearts/Heart_Default.png">
    <div class="tooltiptext-heart"><img class="heart-img" src="assets/hearts/Heart_Light_1.png"><img class="heart-img" src="assets/hearts/Heart_Light_2.png"><img class="heart-img" src="assets/hearts/Heart_Light_3.png"><img class="heart-img" src="assets/hearts/Heart_Light_4.png"><img class="heart-img" src="assets/hearts/Heart_Light_5.png"><img class="heart-img" src="assets/hearts/Heart_Light_6.png"><img class="heart-img" src="assets/hearts/Heart_Light_7.png"><img class="heart-img" src="assets/hearts/Heart_Light_8.png"><img class="heart-img" src="assets/hearts/Heart_Light_9.png"></div>
  </div>
`;

  const heartElement = document.createElement('div');
  heartElement.innerHTML = heartElementHTML;

  const stickerStarContainer = stickerElement.querySelector('.sticker-star-container');
  stickerStarContainer.insertAdjacentElement('afterend', heartElement);

  const HeartMenuBtn = stickerElement.querySelector(".heart-menu-btn");

  HeartMenuBtn.addEventListener("mousedown", () => {
    HeartMenuBtn.classList.add("scale-down");
  });
  HeartMenuBtn.addEventListener("mouseup", () => {
    HeartMenuBtn.classList.remove("scale-down");
  });
  HeartMenuBtn.addEventListener("mouseleave", () => {
    HeartMenuBtn.classList.remove("scale-down");
  });
  HeartMenuBtn.addEventListener("touchstart", () => {
    HeartMenuBtn.classList.add("scale-down");
  });
  HeartMenuBtn.addEventListener("touchend", () => {
    HeartMenuBtn.classList.remove("scale-down");
  });
}


// window.addEventListener('load', function() {
//   toggleHeartMenuBtn();
// });

function toggleHeartMenuBtn() {
  document.addEventListener('click', function (event) {
    if (event.target.matches('.heart-menu-btn')) {
      var btn = event.target;
      var currentSrc = btn.getAttribute('src');
      var newSrc = '';

      if (currentSrc.includes('HeartMenuCloseBtn_Light.png')) {
        newSrc = currentSrc.replace('HeartMenuCloseBtn_Light.png', 'Heart_Default.png');
      } else {
        newSrc = currentSrc.replace('Heart_Default.png', 'HeartMenuCloseBtn_Light.png');
      }

      btn.setAttribute('src', newSrc);
    }
  });
}

function appendSpareSpinner(stickerElement) {
  const spareSpinnerContainer = document.createElement("div");
  spareSpinnerContainer.classList.add("spare-spinner-container");
  const SpareText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "SpareLabel")[CurrentLanguageCode];
  spareSpinnerContainer.innerHTML = `
    <div class="spare-field">
      <label for="SpareQuantity" class="spare-header" data-translation-key="SpareLabel">${SpareText}</label>
      <input type="number" inputmode="numeric" id="SpareQuantity" class="spare-text" name="SpareQuantity" min="0" max="100" value="0"size="6">
    </div>
  `;
  stickerElement.appendChild(spareSpinnerContainer);
}

function appendTradeButtons(stickerElement) {
  const TradeButtonContainer = document.createElement("div");
  TradeButtonContainer.classList.add("trade-button-container");
  TradeButtonContainer.classList.add("BtnGroup2");
  TradeButtonContainer.innerHTML = `
    <button class="lfft-btn lf-btn" type="button" data-property="lookingfor" tabindex="-1">LF</button><button class="lfft-btn ft-btn" type="button" data-property="fortrade" tabindex="-1">FT</button>
  `;
  stickerElement.appendChild(TradeButtonContainer);

  const buttons = TradeButtonContainer.querySelectorAll(".lfft-btn"); // Target buttons within TradeButtonContainer

  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellow");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellow");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellow");
    });
    button.addEventListener("touchstart", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellow");
    });
    button.addEventListener("touchend", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellow");
    });

    button.addEventListener("click", (event) => {
      const button = event.target.closest(".lfft-btn");
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
  var button = document.querySelector(`[data-global="${globalID}"] .trade-button-container .lfft-btn[data-property="${property}"]`);

  if (button) {
    // Update the userData property value
    userData[globalID][property] = ((userData[globalID][property]) + 1) % 2;
    //console.log(userData[globalID][property]);

    // Add or remove the .btnGreen class based on the updated value
    if (userData[globalID][property] === 1) {
      if (property === "lookingfor") { button.classList.add("btnRed"); }
      if (property === "fortrade") { button.classList.add("btnGreen"); }
    } else {
      if (property === "lookingfor") { button.classList.remove("btnRed"); }
      if (property === "fortrade") { button.classList.remove("btnGreen"); }
    }
  }
}

var IgnorePrestigeBtn = document.getElementById("IgnorePrestigeBtn");
IgnorePrestigeBtn.addEventListener("click", function () {
  IgnorePrestige = (IgnorePrestige + 1) % 2;
  if (IgnorePrestige === 1) { IgnorePrestigeBtn.classList.add("btnGreen"); }
  else { IgnorePrestigeBtn.classList.remove("btnGreen"); }
  //clearFilters();
  GenerateFilterSetButtons();
  document.querySelector("#stickerset-filter .btn-subgroup").querySelectorAll(".filter-btn").forEach((button) => {ChangeFilterBtnStyle(button);})
  UpdateTotalStickerQuantity();
  UpdateTotalStickerByRarityQuantity();
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === container.getAttribute("data-global"));
    if (stickerData.Prestige === "1") {      
      RestoreSelected(userData, container);
      RestoreStickerSpares(userData, container);
      RestoreTradeStates(userData, container);
      ChangeUserDataHaveSpareValue(userData, container);
    }
  });
  PerformFilters(userData);
  countSelectedStickers();
  countVaultStickers();
});

// Add event listeners to LF and FT buttons
document.querySelectorAll(".trade-button-container .btn").forEach(function (button) {
  button.addEventListener("click", function () {
    var globalID = button.closest(".sticker-card-container").getAttribute("data-global");
    var property = button.getAttribute("data-property");
    updateLFOrFTValue(globalID, property);
  });
});


// Effects for ALL .btn buttons in the website
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
  button.addEventListener("mousedown", () => {
    button.classList.add("scale-down");
    button.classList.add("btnYellow");
  });
  button.addEventListener("mouseup", () => {
    button.classList.remove("scale-down");
    button.classList.remove("btnYellow");
  });
  button.addEventListener("mouseleave", () => {
    button.classList.remove("scale-down");
    button.classList.remove("btnYellow");
  });
  button.addEventListener("touchstart", () => {
    button.classList.add("scale-down");
    button.classList.add("btnYellow");
  });
  button.addEventListener("touchend", () => {
    button.classList.remove("scale-down");
    button.classList.remove("btnYellow");
  });
});

const SortButtons = document.querySelectorAll(".sort-btn");
SortButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    PerformSort(event);
  });
});

function PerformSort(event) {
  const clickedButton = event.currentTarget;
  const toSortKey = clickedButton.dataset.sortType;

  const containers = Array.from(document.querySelectorAll("#current-sticker-board .sticker-card-container"));
  if (containers.length === 0) { return; }

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

  if (clickedButton.dataset.sortOnsite === "selected") {
    PerformSortOnsite(clickedButton);
  }
  const sortButtons = Array.from(document.querySelectorAll(".sort-btn"));
  sortButtons.forEach(button => button.classList.remove("btnBlue"));
  clickedButton.classList.add("btnBlue");
}

function PerformSortOnsite(clickedSortBtn) {
  const containerSelector = "#current-sticker-board .sticker-card-container";
  const containers = document.querySelectorAll(containerSelector);
  const prioritizeClassToSort = clickedSortBtn.dataset.sortOnsite;

  if (prioritizeClassToSort === "selected") {
    const selectedContainers = Array.from(containers).filter(container =>
      container.classList.contains("selected")
    );
    const notSelectedContainers = Array.from(containers).filter(container =>
      !container.classList.contains("selected")
    );

    const parentElement = containers[0].parentElement;
    selectedContainers.forEach(container => parentElement.appendChild(container));
    notSelectedContainers.forEach(container => parentElement.appendChild(container));
  }
}

const sortButtons = Array.from(document.querySelectorAll(".sort-btn"));
sortButtons.forEach(button => button.addEventListener("click", PerformSort));

function findStickerData(globalId) { return STICKER_DATA.find(item => item["GlobalID"] === globalId); }

function compareStickerNames(aData, bData) {
  const aName = aData["GlobalID"];
  const bName = bData["GlobalID"];
  return aName.localeCompare(bName);
}

function handleSortOrderBtnClick() {
  AscendZeroDescendOne = (AscendZeroDescendOne + 1) % 2;
  const containerSelector = "#sticker-board #current-sticker-board";
  const container = document.querySelector(containerSelector);
  const sortOrderBtnText = document.getElementById("SortOrderBtnText");

  Array.from(container.children).reverse().forEach(child => { container.appendChild(child); });

  sortOrderBtnText.setAttribute('data-translation-key', `SortOrderBtnText_${AscendZeroDescendOne}`);
  translateLanguage(CurrentLanguageCode, `SortOrderBtnText_${AscendZeroDescendOne}`);
}

document.getElementById("SortOrderBtn").addEventListener("click", handleSortOrderBtnClick);


// SEARCH BAR (Filter)
function FilterBySearchbar(GlobalID) {
  var searchbar = document.getElementById("filtermenu-searchbar");
  var filterName = searchbar.getAttribute("data-filtervalue");

  if (searchbar.value === "") {
    FilterList[filterName].FilterState = 0;
    userData[GlobalID].show = 1;
    updateClearFiltersButton();
    return;
  }

  var filterValue = searchbar.value.trim();

  if (filterValue.includes(",")) {
    filterValue = filterValue.split(",").map(function (value) {
      return value.trim(); // Remove leading and trailing spaces
    });
  } else {
    filterValue = [filterValue];
  }

  filterValue = filterValue.filter(function (value) {
    return value.trim() !== "";
  });

  if (FilterList.hasOwnProperty(filterName)) {
    FilterList[filterName].FilterValue = filterValue;
    FilterList[filterName].FilterState = filterValue.length > 0 ? 1 : 0;
  }

  var stickerObject = STICKER_DATA.find(function (item) {return item.GlobalID === GlobalID;});
  var SetID = stickerObject.SetID;
  var setObject = SET_DATA.find(function (item) {return item.SetID === SetID;})
  var setNameOriginal = setObject[`SetName${CurrentLanguageCode}`];

  if (stickerObject) {
    var stickerName = stickerObject[`StickerName${CurrentLanguageCode}`].toLowerCase().replace(/é/g, "e").replace(/ü/g, "u").replace(/'/g, "").replace(/！/g, "!");
    var setName = setNameOriginal.toLowerCase().replace(/é/g, "e").replace(/ü/g, "u").replace(/'/g, "").replace(/！/g, "!");
    //var albumName = stickerObject.AlbumName.toLowerCase().replace(/é/g, "e").replace(/ü/g, "u").replace(/'/g, "");
    var lowercaseFilterValue = filterValue.map(function (value) {
      return value.toLowerCase().replace(/é/g, "e").replace(/ü/g, "u").replace(/'/g, "").replace(/！/g, "!");
    });

    if (filterValue.length === 1) {
      if (
        stickerName.includes(lowercaseFilterValue[0]) ||
        setName.includes(lowercaseFilterValue[0]) ||
        //albumName.includes(lowercaseFilterValue[0]) ||
        GlobalID.toString() === lowercaseFilterValue[0] ||
        stickerObject.SetID.toString() === lowercaseFilterValue[0]
      ) {
        userData[GlobalID].show = 1;
      } else {
        userData[GlobalID].show = 0;
      }
    } else if (filterValue.length > 1) {
      if (AndZeroOrOne === 0) {
        if (
          lowercaseFilterValue.every(function (value) {
            return (
              stickerName.includes(value) ||
              setName.includes(value) ||
              //albumName.includes(value) ||
              GlobalID.toString() === value ||
              stickerObject.SetID.toString() === value
            );
          })
        ) {
          userData[GlobalID].show = 1;
        } else {
          userData[GlobalID].show = 0;
        }
      } else if (AndZeroOrOne === 1) {
        if (
          lowercaseFilterValue.some(function (value) {
            return (
              stickerName.includes(value) ||
              setName.includes(value) ||
              //albumName.includes(value) ||
              GlobalID.toString() === value ||
              stickerObject.SetID.toString() === value
            );
          })
        ) {
          userData[GlobalID].show = 1;
          return;
        } else {
          userData[GlobalID].show = 0;
        }
      }
    }
  }
}

const searchbar = document.getElementById("filtermenu-searchbar");
searchbar.addEventListener("input", () => { PerformFilters(userData); });

document.addEventListener("click", function (event) {
  if (event.target.id === "ClearFilterMenuSearchBar") {
    document.getElementById("filtermenu-searchbar").value = "";
    PerformFilters(userData);
  }
});

// FILTER (Filter)
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    ChangeFilterButtonState(button, true);
    PerformFilters(userData);
  });
});

function ChangeFilterButtonState(ButtonElement, isThisBtnClicked) {
  if (isThisBtnClicked) {
    FilterList[ButtonElement.dataset.filtervalue] = {
      ...FilterList[ButtonElement.dataset.filtervalue],
      FilterState: (FilterList[ButtonElement.dataset.filtervalue].FilterState + 1) % 3,
    };
  }
  ChangeFilterBtnStyle(ButtonElement);
};

function ChangeFilterBtnStyle(ButtonElement) {
  const filterState = FilterList[ButtonElement.dataset.filtervalue].FilterState;
  if (filterState === 0) { ButtonElement.classList.remove("btnRed", "btnGreen"); }
  else if (filterState === 1) { ButtonElement.classList.add("btnGreen"); ButtonElement.classList.remove("btnRed"); }
  else if (filterState === 2) { ButtonElement.classList.add("btnRed"); ButtonElement.classList.remove("btnGreen"); }
}

// Function to update the filter lengths
function updateClearFiltersButton() {
  let filterLengthElement = 0;
  Object.values(FilterList).forEach(item => {
    if (item.FilterState !== 0) { filterLengthElement++; }
  })
  document.getElementById("filterLength").textContent = filterLengthElement;
  ChangeClearFiltersButtonStyle();
}

function ChangeClearFiltersButtonStyle() {
  if (document.getElementById("filterLength").textContent > 0) {
    document.getElementById("ClearFiltersBtn").classList.add("btnRed");
  } else {
    document.getElementById("ClearFiltersBtn").classList.remove("btnRed");
  }
}


const clearFiltersBtn = document.getElementById("ClearFiltersBtn");
clearFiltersBtn.addEventListener("click", () => { clearFilters(); })
function clearFilters() {
  document.getElementById("filtermenu-searchbar").value = "";
  Object.values(FilterList).forEach(item => {
    if (item.FilterState !== 0 && item.FilterName !== "1>StickerName>") {
      item.FilterState = 0;
      const FilterBtnSource = document.querySelector(`.filter-btn[data-filtervalue="${item.FilterName}"]`);
      ChangeFilterButtonState(FilterBtnSource, false);
    }
  })
  PerformFilters(userData);
}

document.getElementById("RefreshFiltersBtn").addEventListener("click", function () { PerformFilters(userData); })

const AndOrFilterModeBtn = document.getElementById("AndOrFilterModeBtn");
AndOrFilterModeBtn.addEventListener("click", function () {
  const buttonText = document.getElementById("AndOrFilterModeBtnText");
  AndZeroOrOne = (AndZeroOrOne + 1) % 2;
  buttonText.setAttribute('data-translation-key', `AndOrFilterModeBtnText_${AndZeroOrOne}`);
  translateLanguage(CurrentLanguageCode, `AndOrFilterModeBtnText_${AndZeroOrOne}`);
  document.getElementById("AndOrFilterModeBtnTooltip").setAttribute('data-translation-key', `AndOrFilterModeBtnTooltipText_${AndZeroOrOne}`);
  translateLanguage(CurrentLanguageCode, `AndOrFilterModeBtnTooltipText_${AndZeroOrOne}`);
  PerformFilters(userData);
});

function PerformFilters(userData) {
  for (var key in userData) {
    userData[key].show = 1;

    if (AndZeroOrOne === 0) {
      FilterBySpareRange(FilterList, key);
      if (userData[key].show === 1) {
        FilterBySearchbar(key);
        if (userData[key].show === 1) {
          FilterByButtons(key);
        }
      }
    } else if (AndZeroOrOne === 1) {
      FilterBySpareRange(FilterList, key);
      if (userData[key].show === 1) {
        FilterByButtons(key);
        if (IncludeStateFilters.length === 0 && ExcludeStateFilters.length === 0) {
          userData[key].show = 0;
          if (document.getElementById("filtermenu-searchbar").value === "") {
            userData[key].show = 1;
          }
        }
        if ((userData[key].show === 0 && document.getElementById("filtermenu-searchbar").value !== "")) {
          FilterBySearchbar(key);
        }
      }
    }
  }
  if (document.getElementById("filtermenu-searchbar").value === "") { FilterList[document.getElementById("filtermenu-searchbar").getAttribute("data-filtervalue")].FilterState = 0; }
  updateClearFiltersButton();
  if(document.querySelector("#current-sticker-board .current-sticker-board-none")){
    document.querySelector("#current-sticker-board .current-sticker-board-none").remove();
  }
  document.getElementById("current-sticker-board").style.alignContent = "";
  generateCurrentStickerBoard(STICKER_DATA, userData, "current-sticker-board");

  const containers = Array.from(document.querySelectorAll("#current-sticker-board .sticker-card-container"));
  if (containers.length === 0) {
    const NoMatchesFoundText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "NoMatchesFound")[CurrentLanguageCode];
    document.getElementById("current-sticker-board").innerHTML = `<span class="current-sticker-board-none" data-translation-key="NoMatchesFound">${NoMatchesFoundText}</span>`;
    document.getElementById("current-sticker-board").style.alignContent = "center";
    return;
  }
  else {
    const currentTarget = document.querySelector(".sort-btn.btnBlue");
    if (currentTarget) {
      PerformSort({ currentTarget });
    } else {
      PerformSort({ currentTarget: document.querySelector(`button[data-sort-type="GlobalID"]`) });
    }
  }
}

const DefaultStateFilters = [];
const IncludeStateFilters = [];
const ExcludeStateFilters = [];
function FilterByButtons(GlobalID) {
  var sticker = STICKER_DATA.find(function (item) { return item.GlobalID === GlobalID; });
  DefaultStateFilters.length = 0;
  IncludeStateFilters.length = 0;
  ExcludeStateFilters.length = 0;

  for (const key in FilterList) {
    const filter = FilterList[key];
  
    if (
      filter.FilterName !== "1>StickerName>" &&
      filter.FilterName !== "0>spare>spare-filter-min|spare-filter-max"
    ) {
      if (filter.FilterName.includes("SetID")) {
        const setId = filter.FilterName.split(">")[2];
        const set = SET_DATA.find((item) => item.SetID === setId);
  
        if (set && IgnorePrestige === 1 && set.Prestige === "1") {
          continue;
        }
      }
  
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
  if (IncludeStateFilters.length === 0 && ExcludeStateFilters.length === 0) {
    userData[GlobalID].show = 1; return;
  }

  // AND Mode
  if (AndZeroOrOne === 0) {
    // Include Filter (AND)
    for (const filter of IncludeStateFilters) {
      var filterKeytemp = filter.FilterKey;
      if (filter.inDatabase === "0") {
        if (userData[GlobalID][filterKeytemp] !== parseInt(filter.FilterValue)) {
          userData[GlobalID].show = 0;
        }
      } else if (filter.inDatabase === "1") {
        if (sticker[filterKeytemp] !== filter.FilterValue) {
          userData[GlobalID].show = 0;
        }
      }
    }
    // Exclude Filter (AND)
    for (const filter of ExcludeStateFilters) {
      var filterKeytemp = filter.FilterKey;
      if (filter.inDatabase === "0") {
        if (userData[GlobalID][filterKeytemp] === parseInt(filter.FilterValue)) {
          userData[GlobalID].show = 0;
        }
      } else if (filter.inDatabase === "1") {
        if (sticker[filterKeytemp] === filter.FilterValue) {
          userData[GlobalID].show = 0;
        }
      }
    }
  }
  // OR Mode
  else if (AndZeroOrOne === 1) {
    // Include Filter (OR)
    if (IncludeStateFilters.length > 0) {
      for (const filter of IncludeStateFilters) {
        var filterKeytemp = filter.FilterKey;

        if (filter.inDatabase === "0") {
          if (userData[GlobalID][filterKeytemp] === parseInt(filter.FilterValue)) {
            userData[GlobalID].show = 1;
            return;
          } else { userData[GlobalID].show = 0; }
        } else if (filter.inDatabase === "1") {
          if (sticker[filterKeytemp] === filter.FilterValue) {
            userData[GlobalID].show = 1;
            return;
          } else { userData[GlobalID].show = 0; }
        }
      }
    }
    // Exclude Filter (OR)
    if (userData[GlobalID].show === 0 || ExcludeStateFilters.length > 0) {
      for (const filter of ExcludeStateFilters) {
        var filterKeytemp = filter.FilterKey;
        if (filter.inDatabase === "0") {
          if (userData[GlobalID][filterKeytemp] !== parseInt(filter.FilterValue)) {
            userData[GlobalID].show = 1;
            return;
          } else { userData[GlobalID].show = 0; return; }
        } else if (filter.inDatabase === "1") {
          if (sticker[filterKeytemp] !== filter.FilterValue) {
            userData[GlobalID].show = 1;
            return;
          } else { userData[GlobalID].show = 0; return; }
        }
      }
    }
  }
}


function handleExpandBtnIconClick() {
  const btnGroupTitles = document.getElementsByClassName("btn-grp-title");
  Array.from(btnGroupTitles).forEach(btnGroupTitle => {
    btnGroupTitle.addEventListener("click", (event) => {
      const expandBtnIcon = event.currentTarget.querySelector(".ExpandBtnIcon");
      const currentSrc = expandBtnIcon.getAttribute("src");
      const upwardsArrowFilename = "UpwardsArrow.png";
      const downwardsArrowFilename = "DownwardsArrow.png";
      const currentFilename = currentSrc.substring(currentSrc.lastIndexOf("/") + 1);
      if (currentFilename === upwardsArrowFilename) {
        expandBtnIcon.src = currentSrc.replace(upwardsArrowFilename, downwardsArrowFilename);
      } else if (currentFilename === downwardsArrowFilename) {
        expandBtnIcon.src = currentSrc.replace(downwardsArrowFilename, upwardsArrowFilename);
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  handleExpandBtnIconClick();
});

document.addEventListener("click", event => {
  const target = event.target;
  const parentContainer = target.closest(".sticker-card-container");
  if (parentContainer && target.classList.contains("sticker-card")) {
    parentContainer.classList.toggle("selected");
    parentContainer.classList.toggle("not-selected");
    UpdateCurrentAlbumStickerStates(parentContainer.getAttribute("data-global"));    
    ApplySelectedStyle(parentContainer);
    ChangeUserDataHaveSpareValue(userData, parentContainer);
    countSelectedStickers();
    countVaultStickers();
  }
});


const btnGroupTitles = document.querySelectorAll(".btn-grp-title");

btnGroupTitles.forEach(btnGroupTitle => {
  btnGroupTitle.addEventListener("click", () => {
    const parentContainer = btnGroupTitle.parentElement;
    const filterBtnSubgroup = parentContainer.querySelectorAll(".btn-subgroup");
    filterBtnSubgroup.forEach(element => {
      element.classList.toggle("hidden");
    });
  });
});


const stickerContainer = document.getElementById("current-sticker-board");
stickerContainer.addEventListener("input", function (event) {
  const target = event.target;
  const clickedStickerContainer = target.closest(".sticker-card-container");
  if (target.classList.contains("spare-text") && clickedStickerContainer) {
    target.value = target.value.replace(/^0+(?=\d)/, "");
    const dataGlobal = clickedStickerContainer.getAttribute("data-global");
    if (target.value > 100) {
      if (target.value.slice(0, -1) === "100") {target.value = "100";} 
      else {target.value = target.value.slice(0, 2);}
    } else if (target.value < 0) {target.value = 0;} else if (target.value === "") {
      setTimeout(() => {if (target.value === "") {target.value = 0;}}, 5000);
      // Set 5s timeout for user to type before setting it to zero
    }
    if (target.value > 0) {
      if (!clickedStickerContainer.classList.contains("selected")) {
        clickedStickerContainer.classList.add("selected");
        clickedStickerContainer.classList.remove("not-selected");
        userData[dataGlobal].selected = 1;
      }
    }
    countSelectedStickers();
    UpdateCurrentAlbumStickerStates(dataGlobal);
    ChangeUserDataHaveSpareValue(userData, clickedStickerContainer);
    //setTimeout(() => {ApplySelectedStyle(clickedStickerContainer);}, 0);
    ApplySelectedStyle(clickedStickerContainer)
    countVaultStickers();
  }
});

const minFilterInput = document.getElementById("spare-filter-min");
const maxFilterInput = document.getElementById("spare-filter-max");

minFilterInput.addEventListener("input", handleFilterInput);
maxFilterInput.addEventListener("input", handleFilterInput);

function handleFilterInput(event) {
  const target = event.target;
  if (target.classList.contains("spare-filter-text")) {
    target.value = target.value.replace(/^0+(?=\d)/, "");
    if (target.value > 100) {
      if (target.value.slice(0, -1) === "100") {
        target.value = "100";
      } else {
        target.value = target.value.slice(0, 2);
      }
    } else if (target.value < 0) {
      target.value = 0;
    } else if (target.value === "") {
      setTimeout(() => {
        if (target.value === "") { // Check if value is still empty before setting it to 0
          target.value = 0;
        }
      }, 5000); // Set 5s timeout for user to type before setting it to zero
    }
  }
}

const SpareFilterBtn = document.getElementById("spare-filter-btn");
//minFilterInput.addEventListener("mouseleave", () => setTimeout(SwapSpareFilterMinMax, 5000));
//maxFilterInput.addEventListener("mouseleave", () => setTimeout(SwapSpareFilterMinMax, 5000));
function SwapSpareFilterMinMax(event) {
  if (parseInt(minFilterInput.value) > parseInt(maxFilterInput.value)) {
    let min = maxFilterInput.value;
    let max = minFilterInput.value;
    minFilterInput.value = min;
    maxFilterInput.value = max;
  }
}
SpareFilterBtn.addEventListener("click", () => {
  SwapSpareFilterMinMax();
  PerformFilters(userData);
});


function UpdateCurrentAlbumStickerStates(StickerGlobalID) {
  const stickerElement = document.querySelector(`.sticker-card-container[data-global="${StickerGlobalID}"]`);
  const selected = stickerElement.classList.contains("not-selected") ? 0 : 1;
  const spareValue = parseInt(stickerElement.querySelector(".spare-text").value);
  userData[StickerGlobalID] = {
    ...userData[StickerGlobalID],
    selected: selected,
    spare: spareValue
  };
}



function FilterBySpareRange(FilterList, GlobalID) {
  const filterKey = "0>spare>spare-filter-min|spare-filter-max";
  const filterData = FilterList[filterKey];

  if (filterData && filterData.FilterState === 0) {
    userData[GlobalID].show = 1;
    return;
  }

  const [minKey, maxKey] = filterData.FilterValue;
  const minValue = parseInt(document.getElementById(minKey).value, 10);
  const maxValue = parseInt(document.getElementById(maxKey).value, 10);

  const invertFilter = filterData.FilterState === 2;

  const spareValue = parseInt(userData[GlobalID].spare, 10);

  if (spareValue >= minValue && spareValue <= maxValue) {
    userData[GlobalID].show = invertFilter ? 0 : 1;
  } else {
    userData[GlobalID].show = invertFilter ? 1 : 0;
  }
  return;
}

function RestoreStickerSpares(userData, StickerContainer) {
  const dataGlobalValue = StickerContainer.getAttribute("data-global");
  const stickerData = userData[dataGlobalValue];
  const spareValue = stickerData.spare;
  StickerContainer.querySelector(".spare-text").value = spareValue;
}

function RestoreSelected(userData, StickerContainer) {
  const dataGlobalValue = StickerContainer.getAttribute("data-global");
  StickerContainer.classList.toggle("selected", userData[dataGlobalValue].selected === 1);
  StickerContainer.classList.toggle("not-selected", userData[dataGlobalValue].selected === 0);
  ApplySelectedStyle(StickerContainer);
}

function RestoreTradeStates(userData, StickerContainer) {
  const dataGlobalValue = StickerContainer.getAttribute("data-global");
  const stickerData = userData[dataGlobalValue];
  StickerContainer.querySelector(`.trade-button-container .lfft-btn[data-property="lookingfor"]`).classList.remove("btnRed");
  StickerContainer.querySelector(`.trade-button-container .lfft-btn[data-property="fortrade"]`).classList.remove("btnGreen");
  if (stickerData.lookingfor === 1) {
    StickerContainer.querySelector(`.trade-button-container .lfft-btn[data-property="lookingfor"]`).classList.add("btnRed");
  }
  if (stickerData.fortrade === 1) {
    StickerContainer.querySelector(`.trade-button-container .lfft-btn[data-property="fortrade"]`).classList.add("btnGreen");
  }
}

function updateProgressBar() {
  var progressContainers = document.querySelectorAll(".progress-container");
  // console.log(document.querySelector("#total-stickers-quantity").textContent);

  progressContainers.forEach(function (container) {
    var progressText = container.querySelector(".progress-text").textContent;
    progressText = progressText.replace(/\s/g, "");
    var progressValue = parseInt(progressText.split("/")[0]);
    var totalValue = parseInt(progressText.split("/")[1]);

    if (progressValue === "0") { progressBar.style.width = 0; }
    else {
      var progressPercentage = (progressValue / totalValue) * 100;

      var progressBar = container.querySelector(".progress-bar");
      progressBar.style.width = progressPercentage + "%";
      if(progressValue < totalValue){
        progressBar.style.borderRadius = "9px 0 0 9px";
      }
      else{progressBar.style.borderRadius = "9px";}
    }
  });
}

function GenerateFilterSetButtons() {
  const filterBtnSubgroup = document.querySelector("#stickerset-filter .btn-subgroup");
  const setProgressTracker = document.querySelector("#set-progress-tracker");
  filterBtnSubgroup.innerHTML = setProgressTracker.innerHTML = "";

  SET_DATA.forEach((set) => {
    if (set.AlbumNo === CurrentAlbumNumber) {
      const SetID = set.SetID;
      const SetColour = set.Colour;
      const SetNo = parseInt(SetID) - parseInt(set.AlbumNo) * 100;
      const SetName = set[`SetName${CurrentLanguageCode}`];
      const SetImgSrc = `Icon_${SetID}.png`;
      const SetTotalStickers = STICKER_DATA.filter(sticker => sticker.SetID === SetID).length;
      const SetIsPrestige = set.Prestige;

      const existingButton = filterBtnSubgroup.querySelector(`[data-filtervalue="1>SetID>${SetID}"]`);
      const existingSetCardContainer = setProgressTracker.querySelector(`[data-setidnumber="${SetID}"]`);

      const SetText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "set")[CurrentLanguageCode];

      if (IgnorePrestige === 1 && SetIsPrestige === "1") {
        if(existingButton) {existingButton.remove();}
        if(existingSetCardContainer) {existingSetCardContainer.remove();}
      }
      else {
        if (!existingButton) {
          let ButtonElement = `
          <button data-filtervalue="1>SetID>${SetID}" class="filter-btn btn" type="button"><span data-translation-key="set">${SetText}</span>&nbsp;${SetNo}</button>
        `;
        filterBtnSubgroup.innerHTML += ButtonElement;
        }
        if (!existingSetCardContainer) {
          let SetNameClass = "set-name";
          if (SetName.length > 15) { SetNameClass = "set-name-long-min15"; }
          if (isBrighterThan(SetColour, "#CCCCCC")) { SetNameClass += "-dark"; }
          const SetCardContainerElement = `
            <div class="set-card-container"><img draggable="false" data-setidnumber="${SetID}" class="set-logo" src="logo/${SetImgSrc}" onerror="this.onerror=null;this.src="logo/Icon_Placeholder.png";"><div class="${SetNameClass}" style="background-color: ${SetColour};"><span><span data-translation-key="set">${SetText}</span> ${SetNo}</span><span class="SetNameText" data-setid="${SetID}"></span></div><div class="progress-container"><div class="progress-bar"></div><div class="progress-text"><span data-setid="${SetID}">0</span> / ${SetTotalStickers}</div></div></div>
          `;  
          setProgressTracker.innerHTML += SetCardContainerElement;
        }
      }
    }
  });
  translateLanguage(CurrentLanguageCode, "set");
  TranslateSetName(CurrentLanguageCode);
  const buttons = filterBtnSubgroup.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellow");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellow");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellow");
    });
    button.addEventListener("touchstart", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellow");
    });
    button.addEventListener("touchend", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellow");
    });

    button.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (button) {
        ChangeFilterButtonState(button, true);
        PerformFilters(userData);
      }
    });
  });
}

const importBtn = document.querySelector("#import-btn");
const importFromFileBtn = document.querySelector("#import-from-file-btn");
const exportBtn = document.querySelector("#export-btn");
const exportFromFileBtn = document.querySelector("#export-from-file-btn");
const textArea = document.querySelector(".backup-area");



function exportUserData() {
  Object.keys(userData).forEach((key) => {
    userData[key].spare = parseInt(userData[key].spare);
    userData[key] = { ...defaultValues, ...userData[key] };
  });

  const playerIGN = document.getElementById("player-ign").value;
  const playerLink = document.getElementById("player-link").value;
  const LeftoverVaultStars = document.getElementById("leftover-total-vault-quantity").value;

  const additionalLines = [
    `CurrentAlbumNumber: ${CurrentAlbumNumber}`,
    `player-ign: ${playerIGN}`,
    `player-link: ${playerLink}`,
    `leftover-vault-stars: ${LeftoverVaultStars}`,
  ];

  const userDataString = JSON.stringify(userData, null, 2);
  const updatedUserDataString = additionalLines.join("\n") + "\n" + userDataString;
  textArea.value = updatedUserDataString;

  // Save updatedUserDataString in localStorage
  localStorage.setItem("userData", updatedUserDataString);
}

function importUserData(userDataString) {
  if (userDataString === "") {
    console.error("Textarea value is empty.");
    return;
  }

  let parsedData;
  try {
    // Extract player-ign and player-link values
    let playerIGN = "";
    let playerLink = "";
    let LeftoverVaultStars = "";
    let userDataAlbumNumber = ""
    const lines = userDataString.split("\n");
    lines.forEach((line, index) => {
      if (line.startsWith("CurrentAlbumNumber: ")) {
        userDataAlbumNumber = line.substring("CurrentAlbumNumber: ".length);
        if (userDataAlbumNumber !== CurrentAlbumNumber) {
          console.error("Incorrect Album:", userDataAlbumNumber, ", new userData for the current album will be created.");
          CreateNewUserData(STICKER_DATA);
          throw new Error("Incorrect Album");
        }
      } else if (line.startsWith("player-ign: ")) {
        playerIGN = line.substring("player-ign: ".length);
      } else if (line.startsWith("player-link: ")) {
        playerLink = line.substring("player-link: ".length);
      } else if (line.startsWith("leftover-valve-stars: ")) {
        lines[index] = line.replace("leftover-valve-stars: ", "leftover-vault-stars: ");
      } else if (line.startsWith("leftover-vault-stars: ")) {
        LeftoverVaultStars = line.substring("leftover-vault-stars: ".length);
      }
    });
    if (LeftoverVaultStars === "") { LeftoverVaultStars = "0"; }

    // Remove player-ign and player-link lines from userDataString
    const filteredLines = lines.filter(line => !line.startsWith("CurrentAlbumNumber: ") && !line.startsWith("player-ign: ") && !line.startsWith("player-link: ") && !line.startsWith("leftover-vault-stars: "));
    const filteredUserDataString = filteredLines.join("\n");

    parsedData = JSON.parse(filteredUserDataString);

    // Check for missing keys and add default values
    Object.keys(parsedData).forEach((key) => {
      // Destructure the 'id' property from the object
      const { id, ...values } = parsedData[key];
      // Create a new object with the parsed values
      parsedData[key] = {
        // Keep the 'id' property as is
        id,
        // Parse the remaining values into integers
        ...Object.fromEntries(Object.entries(values).map(([key, value]) => [key, parseInt(value)]))
      };
    });

    // Store player-ign and player-link values
    document.getElementById("player-ign").value = playerIGN;
    document.getElementById("player-link").value = playerLink;
    document.getElementById("leftover-total-vault-quantity").value = LeftoverVaultStars

    userData = parsedData;
    clearFilters();
    const containers = document.querySelectorAll(".sticker-card-container");
    containers.forEach((container) => {
      RestoreSelected(userData, container);
      RestoreStickerSpares(userData, container);
      RestoreTradeStates(userData, container);
      ChangeUserDataHaveSpareValue(userData, container);
      // countSelectedStickers();
      // countVaultStickers();
    });
    countVaultStickers();
    countSelectedStickers();
    updateProgressBar();
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return;
  }

  if (typeof userData === "object" && !Array.isArray(userData)) {
    console.log("Successfully imported userData:", userData);
  } else {
    console.error("Invalid userData format. Expected an object.");
    CreateNewUserData();
  }
}

importBtn.addEventListener("click", () => {
  const userDataString = textArea.value.trim();
  importUserData(userDataString);
});

importFromFileBtn.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt";
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const userDataString = event.target.result.trim();
      textArea.value = userDataString;
      importUserData(userDataString);
    };
    reader.readAsText(file);
  });
  fileInput.click();
});



exportBtn.addEventListener("click", exportUserData);

exportFromFileBtn.addEventListener("click", () => {
  exportUserData();
  const blob = new Blob([textArea.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mogotools-userData.txt";
  link.click();
});

function UpdateTotalStickerQuantity() {
  const totalStickersQuantity = document.querySelector("#total-stickers-quantity");
  let count = 0;
  STICKER_DATA.forEach((sticker) => {
    if (IgnorePrestige === 1 && sticker.Prestige === "1") { return; }
    if (sticker.AlbumNo === CurrentAlbumNumber) { count++; }
  })
  totalStickersQuantity.textContent = count.toString();
}

function UpdateTotalStickerByRarityQuantity() {
  for (let RarityNumber = 1; RarityNumber <= 5; RarityNumber++) {
    const RarityQuantity = document.getElementById(`total-rarity${RarityNumber}-quantity`);
    let count = 0;

    STICKER_DATA.forEach((sticker) => {
      if (IgnorePrestige === 1 && sticker.Prestige === "1") { return; }
      if (parseInt(sticker.StickerRarity) === RarityNumber && sticker.AlbumNo === CurrentAlbumNumber) { count++; }
    });

    RarityQuantity.textContent = count.toString();
  }
  const GoldQuantity = document.getElementById(`total-gold-quantity`);
  let count = 0;

  STICKER_DATA.forEach((sticker) => {
    if (IgnorePrestige === 1 && sticker.Prestige === "1") { return; }
    if (parseInt(sticker.Golden) === 1 && sticker.AlbumNo === CurrentAlbumNumber) { count++; }
  });

  GoldQuantity.textContent = count.toString();
}

function countSelectedStickers() {
  const userStickersQuantity = document.querySelector("#user-stickers-quantity");
  const setDuplicates = new Map();
  const setSpans = Array.from(document.querySelectorAll(".progress-text span[data-setid]"));

  // Reset each data-setid value to zero
  setSpans.forEach(setSpan => { setSpan.textContent = "0"; });

  for (const key in userData) {
    const globalId = userData[key].id;
    const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);
    if (IgnorePrestige === 1 && stickerData.Prestige === "1") { continue; }

    else {
      if (userData.hasOwnProperty(key) && userData[key].selected === 1) {
        const setId = Math.floor(userData[key].id / 100);

        if (setDuplicates.has(setId)) {
          setDuplicates.set(setId, setDuplicates.get(setId) + 1);
        } else {
          setDuplicates.set(setId, 1);
        }
      }
    }
  }

  let count = 0;
  for (const [setId, setCount] of setDuplicates) {
    const setSpan = setSpans.find(span => span.getAttribute("data-setid") === setId.toString());
    if (setSpan) {
      setSpan.textContent = (parseInt(setSpan.textContent, 10) + setCount).toString();
    }
    count += setCount;
  }

  userStickersQuantity.textContent = count.toString();
  countSelectedStickerByRarity();
  updateProgressBar();
}

function countSelectedStickerByRarity() {
  for (let RarityNumber = 1; RarityNumber <= 5; RarityNumber++) {
    document.getElementById(`rarity${RarityNumber}-quantity`).textContent = 0;
    document.getElementById(`rarity${RarityNumber}-percentage`).textContent = 0;
  }
  document.getElementById(`gold-quantity`).textContent = 0;
  document.getElementById(`gold-percentage`).textContent = 0;

  for (const key in userData) {
    const globalId = userData[key].id;
    const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);
    if (IgnorePrestige === 1 && stickerData.Prestige === "1") { continue; }

    else {
      if (userData.hasOwnProperty(key) && userData[key].selected === 1) {
        const StickerRarityNumber = stickerData.StickerRarity;
        document.getElementById(`rarity${StickerRarityNumber}-quantity`).textContent++;
        if (stickerData.Golden === "1") { document.getElementById(`gold-quantity`).textContent++ }
      }
    }
  }

  for (let RarityNumber = 1; RarityNumber <= 5; RarityNumber++) {
    const StickerQuantity = parseInt(document.getElementById(`rarity${RarityNumber}-quantity`).textContent);
    const TotalStickerQuantity = parseInt(document.getElementById(`total-rarity${RarityNumber}-quantity`).textContent);
    const percentage = (StickerQuantity / TotalStickerQuantity * 100).toFixed(1);
    document.getElementById(`rarity${RarityNumber}-percentage`).textContent = `${percentage}%`;
  }

  const GoldenPercentage = (parseInt(document.getElementById(`gold-quantity`).textContent) / parseInt(document.getElementById(`total-gold-quantity`).textContent) * 100).toFixed(1);
  document.getElementById(`gold-percentage`).textContent = `${GoldenPercentage}%`;
}

function countVaultStickers() {
  const totalVaultQuantity = document.querySelector("#total-vault-quantity");

  let vaultQuantity = 0;

  for (const key in userData) {
    const globalId = userData[key].id;
    const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);
    if (IgnorePrestige === 1 && stickerData.Prestige === "1") {
      continue;
    }

    if (userData.hasOwnProperty(key) && userData[key].spare > 0 && userData[key].selected === 1) {
      //const globalId = userData[key].id;
      const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);

      if (stickerData) {
        const spareQuantity = userData[key].spare;
        const stickerRarity = parseInt(stickerData.StickerRarity);
        const isPrestige = parseInt(stickerData.Golden);
        if (isPrestige === 1) {
          vaultQuantity += spareQuantity * stickerRarity * 2;
        } else {
          vaultQuantity += spareQuantity * stickerRarity;
        }
      }
    }
  }

  let PrestigeLeftoverQuantity = document.getElementById("leftover-total-vault-quantity").value;
  if (isNaN(PrestigeLeftoverQuantity)) {
    PrestigeLeftoverQuantity = 0;
  }

  const VaultSum = vaultQuantity + parseInt(PrestigeLeftoverQuantity);
  totalVaultQuantity.textContent = VaultSum.toString();

  const vaultTierImage = document.querySelector(".vault-tier");
  let StickersToNextTier = 0;
  let nextTierText = "";

  document.getElementById("NextVaultCounter").style.display = "block";
  if (VaultSum < VaultTierOne) {
    StickersToNextTier = VaultTierOne - VaultSum;
    nextTierText = "NextVaultCounterText_0";
    vaultTierImage.src = "";
  } else if (VaultTierOne <= VaultSum && VaultSum < VaultTierTwo) {
    StickersToNextTier = VaultTierTwo - VaultSum;
    nextTierText = "NextVaultCounterText_1";
    vaultTierImage.src = "assets/stickers/StickerVaultTier1.png";
  } else if (VaultTierTwo <= VaultSum && VaultSum < VaultTierThree) {
    StickersToNextTier = VaultTierThree - VaultSum;
    nextTierText = "NextVaultCounterText_2";
    vaultTierImage.src = "assets/stickers/StickerVaultTier2.png";
  } else if (VaultSum >= VaultTierThree) {
    StickersToNextTier = VaultSum - VaultTierThree;    
    vaultTierImage.src = "assets/stickers/StickerVaultTier3.png";
    nextTierText = "NextVaultCounterText_3";
  }
  
  document.getElementById("NextVaultCounter").setAttribute("data-translation-key", nextTierText);
  translateLanguage(CurrentLanguageCode, nextTierText);
  let NextVaultCounterText = document.getElementById("NextVaultCounter").textContent;
  NextVaultCounterText = NextVaultCounterText.replace('${StickersToNextTier}', StickersToNextTier);
  if (VaultSum >= VaultTierThree) {
    var TierThreeVaultExchangeAmount = Math.floor(VaultSum / VaultTierThree);
    NextVaultCounterText = NextVaultCounterText.replace('${TierThreeVaultExchangeAmount}', TierThreeVaultExchangeAmount);
    if(NextVaultCounterText.includes("${times}")){
      var times = TierThreeVaultExchangeAmount === 0 || TierThreeVaultExchangeAmount > 1 ? 'times' : 'time';
      NextVaultCounterText = NextVaultCounterText.replace('${times}', times);
    }
  }  
  document.getElementById("NextVaultCounter").textContent = NextVaultCounterText;
  // if (VaultSum < VaultTierOne) {
  //   StickersToNextTier = VaultTierOne - VaultSum;
  //   nextTierText = `${StickersToNextTier} stars until Tier 1 vault.`;
  //   vaultTierImage.src = "";
  // } else if (VaultTierOne <= VaultSum && VaultSum < VaultTierTwo) {
  //   StickersToNextTier = VaultTierTwo - VaultSum;
  //   nextTierText = `${StickersToNextTier} stars until Tier 2 vault.`;
  //   vaultTierImage.src = "assets/stickers/StickerVaultTier1.png";
  // } else if (VaultTierTwo <= VaultSum && VaultSum < VaultTierThree) {
  //   StickersToNextTier = VaultTierThree - VaultSum;
  //   nextTierText = `${StickersToNextTier} stars until Tier 3 vault.`;
  //   vaultTierImage.src = "assets/stickers/StickerVaultTier2.png";
  // } else if (VaultSum >= VaultTierThree) {
  //   StickersToNextTier = VaultSum - VaultTierThree;
  //   var TierThreeVaultExchangeAmount = Math.floor(VaultSum / VaultTierThree);
  //   vaultTierImage.src = "assets/stickers/StickerVaultTier3.png";
  //   var times = TierThreeVaultExchangeAmount === 0 || TierThreeVaultExchangeAmount > 1 ? 'times' : 'time';
  //   nextTierText = `${StickersToNextTier} stars remaining after unlocking Tier 3 vault. (Can unlock Tier 3 vault ${TierThreeVaultExchangeAmount} ${times}.)`;
  // }
  // document.getElementById("NextVaultCounter").textContent = nextTierText;
}


function ChangeUserDataHaveSpareValue(userData, StickerContainer) {
  const dataGlobalValue = StickerContainer.getAttribute("data-global");
  if (userData[dataGlobalValue].selected === 1 && userData[dataGlobalValue].spare > 0) {
    userData[dataGlobalValue].havespare = 1;
  } else { userData[dataGlobalValue].havespare = 0; }
}

function UpdateAlbumStartEndTime() {
  const AlbumIconElement = document.getElementById("album-logo-container");
  AlbumIconElement.innerHTML = `<img draggable="false" class="album-logo" src="logo/album_${CurrentAlbumNumber}.png">`;

  const startTimeSpan = document.querySelector("#start-time");
  const endTimeSpan = document.querySelector("#end-time");

  const AlbumData = ALBUM_DATA.find(item => item["AlbumNo"] === CurrentAlbumNumber);

  const startDateTime = new Date(AlbumData.StartTime * 1000);
  const endDateTime = new Date(AlbumData.EndTime * 1000);

  const startFormattedTime = startDateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  const endFormattedTime = endDateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  startTimeSpan.textContent = startFormattedTime;
  endTimeSpan.textContent = endFormattedTime;

  return endDateTime; // Return the endDateTime value
}

function updateTimeLeft(endDateTime) {
  const timeLeftSpan = document.querySelector("#time-left");
  const currentTime = new Date();
  const timeDiff = endDateTime.getTime() - currentTime.getTime();

  if (timeDiff <= 0) {
    timeLeftSpan.textContent = "Album has ended. Waiting for next update...";
  } else {
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

    let timeLeftString = "";

    if (daysLeft > 0) { timeLeftString += `${daysLeft}d `; }
    if (hoursLeft > 0) { timeLeftString += `${hoursLeft}h `; }
    if (minutesLeft > 0) { timeLeftString += `${minutesLeft}m `; }
    timeLeftString += `${secondsLeft}s`;

    timeLeftSpan.textContent = timeLeftString.trim();

    if (timeDiff <= 24 * 60 * 60 * 1000) { timeLeftSpan.style.color = "red"; }
    else { timeLeftSpan.style.color = ""; }
  }
}

const endDateTime = UpdateAlbumStartEndTime();
updateTimeLeft(endDateTime); // Call the function initially to display the time left
setInterval(() => updateTimeLeft(endDateTime), 1000); // Update the time left every second

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

function DarkenColour(colour, percentagevalue) {
  // Convert the hex color to RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };
  // Darken the RGB color by the specified value
  const darkenRgb = (rgb, factor) => {
    const [r, g, b] = rgb;
    const newR = Math.floor(r * factor);
    const newG = Math.floor(g * factor);
    const newB = Math.floor(b * factor);
    return [newR, newG, newB];
  };
  // Convert the RGB color back to hex
  const rgbToHex = (rgb) => {
    const [r, g, b] = rgb;
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? 0 + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  const rgbColour = hexToRgb(colour);
  const darkenFactor = 1 - (percentagevalue / 100); // Convert value to a factor between 0 and 1
  const darkenedRgb = darkenRgb(rgbColour, darkenFactor);
  const darkenedHexColour = rgbToHex(darkenedRgb);
  return darkenedHexColour;
}

function handleSetImageOrientationBtnClick(isClicked) {
  if (isClicked === true) { ImgOrientationLandscapeZeroPortraitOne = (ImgOrientationLandscapeZeroPortraitOne + 1) % 2; }
  document.getElementById("SetImageOrientationBtn").setAttribute('data-translation-key', `SetImageOrientationBtnText_${ImgOrientationLandscapeZeroPortraitOne}`);
  translateLanguage(CurrentLanguageCode, `SetImageOrientationBtnText_${ImgOrientationLandscapeZeroPortraitOne}`);
  PerformFilters(userData);
}
document.getElementById("SetImageOrientationBtn").addEventListener("click", function () {
  handleSetImageOrientationBtnClick(true);
});

let includeIGN = 0;
let includePlayerLink = 0;
var IncludeIGNBtn = document.getElementById("IncludeIGNBtn");
var IncludePlayerLinkBtn = document.getElementById("IncludePlayerLinkBtn");
IncludeIGNBtn.addEventListener("click", function () {
  includeIGN = (includeIGN + 1) % 2;
  if (includeIGN === 1) { IncludeIGNBtn.classList.add("btnGreen"); }
  else { IncludeIGNBtn.classList.remove("btnGreen"); }
});
IncludePlayerLinkBtn.addEventListener("click", function () {
  includePlayerLink = (includePlayerLink + 1) % 2;
  if (includePlayerLink === 1) { IncludePlayerLinkBtn.classList.add("btnGreen"); }
  else { IncludePlayerLinkBtn.classList.remove("btnGreen"); }
});

function copyToCollectionScreenshot(DestinationElement) {
  var middleSide = document.getElementById("middle-side");
  var collectionScreenshot = document.getElementById(DestinationElement);

  if (middleSide && collectionScreenshot) {
    collectionScreenshot.innerHTML = "";

    var clonedContents = middleSide.innerHTML;
    collectionScreenshot.style.backgroundColor = "rgba(248, 244, 228)";
    collectionScreenshot.setAttribute("style", middleSide.getAttribute("style"));
    collectionScreenshot.style.background = `url("assets/background/Collections_Album_BG.png")`;

    // Replace class names in clonedContents
    clonedContents = clonedContents.replace(/sticker-card-container/g, "sticker-card-container-screenshot");
    clonedContents = clonedContents.replace(/trade-button-container/g, "trade-button-container-screenshot");
    collectionScreenshot.innerHTML = clonedContents;

    var screenshotContainers = collectionScreenshot.querySelectorAll(".sticker-card-container-screenshot");
    screenshotContainers.forEach(function (container) {
      var globalID = container.getAttribute("data-global");
      var spanElement = document.createElement("span");
      spanElement.className = "spare-text-screenshot";
      spanElement.textContent = userData[globalID].spare;
      var spareTextElement = container.querySelector(".spare-text");

      if (spareTextElement) {
        spareTextElement.parentNode.replaceChild(spanElement, spareTextElement);
      }

      var spareSpinnerContainer = container.querySelector(".spare-spinner-container");

      if (spareSpinnerContainer) {
        spareSpinnerContainer.parentNode.removeChild(spareSpinnerContainer);
      }

      if (userData[globalID].spare > 0) {
        const stickerData = STICKER_DATA.find(item => item["GlobalID"] === globalID)
        var SpareImagePath = "Collections_TradingGroup_NumberBG_Small.png";
        if(stickerData.Golden === "1"){
          SpareImagePath = "GoldenBlitz_Stickers_Badge01.png";
        };
        var spareContainer = document.createElement("div");
        spareContainer.className = "spare-container-no-spinner";
        spareContainer.innerHTML = `
          <img draggable="false" class="spare-img" src="assets/stickers/${SpareImagePath}">
          <span class="spare-snapshot-text">+${userData[globalID].spare}</span>
        `;
        if(stickerData.Golden === "1"){
          spareContainer.querySelector(".spare-img").style.width = "50%"; 
          spareContainer.style.marginTop = "-63px";
          spareContainer.querySelector(".spare-snapshot-text").style.color = "white";
          
          spareContainer.querySelector(".spare-snapshot-text").style.marginTop = "4.5px";
        };

        if(container.querySelector(".sticker-ribbon")){
          const parentElement = container.querySelector(".sticker-ribbon").parentNode;
          parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon"));
          container.querySelector(".sticker-ribbon").style.marginTop = "-4.5px";
          if(stickerData.Golden === "1"){container.querySelector(".sticker-ribbon").style.marginTop = "-8.5px";}
        }
        if(container.querySelector(".sticker-ribbon-transparent")){
          const parentElement = container.querySelector(".sticker-ribbon-transparent").parentNode;
          parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon-transparent"));
          container.querySelector(".sticker-ribbon-transparent").style.marginTop = "-58.5px";
        }
        if (ImgOrientationLandscapeZeroPortraitOne === 1) {
          if(stickerData.Golden === "0"){
            container.querySelector(".spare-snapshot-text").style.marginLeft = "-31px";
            container.querySelector(".spare-snapshot-text").style.marginTop = "3px";
          }
          else{
            container.querySelector(".spare-snapshot-text").style.marginLeft = "-33px";
          }
        }
        if (navigator.userAgent.indexOf("Safari") > -1) {
          var SpareSnapshotText = container.querySelector(".spare-snapshot-text");
          var currentSpareSnapshotTextMarginTop = parseInt(SpareSnapshotText.style.marginTop);
          SpareSnapshotText.style.marginTop = (currentSpareSnapshotTextMarginTop + 1) + "px";
          if(container.querySelector(".sticker-ribbon")){            
            var stickerRibbon = container.querySelector(".sticker-ribbon");
          }
          if(container.querySelector(".sticker-ribbon-transparent")){
            var stickerRibbon = container.querySelector(".sticker-ribbon-transparent");
          }
          var currentstickerRibbonMarginTop = parseInt(stickerRibbon.style.marginTop);
          stickerRibbon.style.marginTop = (currentstickerRibbonMarginTop + 1) + "px";
        }
      }

      // Check if all ".lf-btn" in all ".trade-button-container-screenshot" have ".btnRed" class
      var allButtonsRed = true;
      var tradeButtonContainers = collectionScreenshot.querySelectorAll(".trade-button-container-screenshot");
      tradeButtonContainers.forEach(function (container) {
        var buttons = container.querySelectorAll(".lf-btn");
        buttons.forEach(function (button) {
          if (!button.classList.contains("btnRed")) {
            allButtonsRed = false;
          }
        });
      });
      // Set the opacity of all ".sticker-card-container-screenshot" elements based on the condition
      if (allButtonsRed) {
        var stickerCardContainers = collectionScreenshot.querySelectorAll(".sticker-card-container-screenshot");
        stickerCardContainers.forEach(function (container) {
          container.style.opacity = "1.0";
        });
      }

      if(container.querySelector(".sticker-ribbon-transparent")){
        container.querySelector(".trade-button-container-screenshot").style.marginTop = "54px";
      }
      else{container.querySelector(".trade-button-container-screenshot").style.marginTop = "6px";}
      container.querySelector(".trade-button-container-screenshot").style.width = "100%";
      container.querySelector(".trade-button-container-screenshot").style.display = "flex";

      if (ImgOrientationLandscapeZeroPortraitOne === 1) {
        container.style.flexBasis = "calc(28% - 10px)";
      }
    });
    if (ImgOrientationLandscapeZeroPortraitOne === 1) {
      collectionScreenshot.style.width = "400px";
      document.getElementById("collection-screenshot-footer-gamever").style.width = "50%";
      document.getElementById("collection-screenshot-footer-link").style.width = "50%";
    }

  } else {
    console.log("Either middle-side or collection-screenshot element is not found.");
  }
}

function copyToTradeScreenshot(DestinationElement, UserDataProperty) {
  var middleSide = document.getElementById("current-sticker-board");
  var collectionScreenshot = document.getElementById(DestinationElement);
  collectionScreenshot.style.alignContent = "";

  if (middleSide && collectionScreenshot) {
    collectionScreenshot.innerHTML = "";
    collectionScreenshot.style.backgroundColor = "rgba(248, 244, 228)";
    const fragment = document.createDocumentFragment();
    const matchingItems = STICKER_DATA.filter(item => item["GlobalID"] in userData && userData[item["GlobalID"]][UserDataProperty] === 1 && userData[item["GlobalID"]].show === 1)
    .sort((a, b) => {
      // Sort by Golden, largest to smallest
      if (a.Golden > b.Golden) return -1;
      if (a.Golden < b.Golden) return 1;

      // If Golden is the same, sort by StickerRarity, largest to smallest
      if (a.StickerRarity > b.StickerRarity) return -1;
      if (a.StickerRarity < b.StickerRarity) return 1;

      // If both Golden and StickerRarity are the same, sort by GlobalID, smallest to largest
      if (a.GlobalID < b.GlobalID) return -1;
      if (a.GlobalID > b.GlobalID) return 1;

      // Items are equal
      return 0;
    });
    if (matchingItems.length === 0) {
      const NoneText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "None")[CurrentLanguageCode];
      collectionScreenshot.innerHTML = `<span class="lfft-snapshot-none" data-translation-key="none">${NoneText}</span>`;
      collectionScreenshot.style.alignContent = "center";
      return;
    } 
    else{
      for (const item of matchingItems) {
        const userDataItem = userData[item["GlobalID"]];
        const globalId = userDataItem.id;    
        const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);
        
        if (IgnorePrestige === 1 && stickerData.Prestige === "1") {continue;}
        else {
          if(userDataItem[UserDataProperty] === 0){continue;}
          else{
            const stickerElement = CreateStickerElement(item, "sticker-card-container", "sticker-card", true);
            fragment.appendChild(stickerElement);
          }
        }
        collectionScreenshot.appendChild(fragment);
      }
  
      // Replace class names in clonedContents
      collectionScreenshot.innerHTML = collectionScreenshot.innerHTML.replace(/sticker-card-container/g, "sticker-card-container-screenshot");
  
      var screenshotContainers = collectionScreenshot.querySelectorAll(".sticker-card-container-screenshot");
      screenshotContainers.forEach(function (container) {
        var globalID = container.getAttribute("data-global");
        var spanElement = document.createElement("span");
        spanElement.className = "spare-text-screenshot";
        spanElement.textContent = userData[globalID].spare;
        var spareTextElement = container.querySelector(".spare-text");
  
        if (userData[globalID][UserDataProperty] === 0) {container.remove();}
        else{
          container.style.opacity = "1.0";
          container.querySelector(".trade-button-container").remove();
          if (spareTextElement) {
            spareTextElement.parentNode.replaceChild(spanElement, spareTextElement);
          }
    
          var spareSpinnerContainer = container.querySelector(".spare-spinner-container");
    
          if (spareSpinnerContainer) {
            spareSpinnerContainer.parentNode.removeChild(spareSpinnerContainer);
          }
    
          if (userData[globalID].spare > 0) {
            const stickerData = STICKER_DATA.find(item => item["GlobalID"] === globalID)
            var SpareImagePath = "Collections_TradingGroup_NumberBG_Small.png";
            if(stickerData.Golden === "1"){
              SpareImagePath = "GoldenBlitz_Stickers_Badge01.png";
            };
            var spareContainer = document.createElement("div");
            spareContainer.className = "spare-container-no-spinner";
            spareContainer.innerHTML = `
              <img draggable="false" class="spare-img" src="assets/stickers/${SpareImagePath}">
              <span class="spare-snapshot-text">+${userData[globalID].spare}</span>
            `;
            if(stickerData.Golden === "1"){
              spareContainer.querySelector(".spare-img").style.width = "50%"; 
              spareContainer.style.marginTop = "-63px";
              spareContainer.querySelector(".spare-snapshot-text").style.color = "white";
              
              spareContainer.querySelector(".spare-snapshot-text").style.marginTop = "4.5px";
            };
    
            if(container.querySelector(".sticker-ribbon")){
              const parentElement = container.querySelector(".sticker-ribbon").parentNode;
              parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon"));
              container.querySelector(".sticker-ribbon").style.marginTop = "-4.5px";
              if(stickerData.Golden === "1"){container.querySelector(".sticker-ribbon").style.marginTop = "-8.5px";}
            }
            if(container.querySelector(".sticker-ribbon-transparent")){
              const parentElement = container.querySelector(".sticker-ribbon-transparent").parentNode;
              parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon-transparent"));
              container.querySelector(".sticker-ribbon-transparent").style.marginTop = "-58.5px";
            }
            if (ImgOrientationLandscapeZeroPortraitOne === 1) {
              if(stickerData.Golden === "0"){
                container.querySelector(".spare-snapshot-text").style.marginLeft = "-31px";
                container.querySelector(".spare-snapshot-text").style.marginTop = "3px";
              }
              else{
                container.querySelector(".spare-snapshot-text").style.marginLeft = "-33px";
              }
            }
            if (navigator.userAgent.indexOf("Safari") > -1) {
              var SpareSnapshotText = container.querySelector(".spare-snapshot-text");
              var currentSpareSnapshotTextMarginTop = parseInt(SpareSnapshotText.style.marginTop);
              SpareSnapshotText.style.marginTop = (currentSpareSnapshotTextMarginTop + 1) + "px";
              if(container.querySelector(".sticker-ribbon")){            
                var stickerRibbon = container.querySelector(".sticker-ribbon");
              }
              if(container.querySelector(".sticker-ribbon-transparent")){
                var stickerRibbon = container.querySelector(".sticker-ribbon-transparent");
              }
              var currentstickerRibbonMarginTop = parseInt(stickerRibbon.style.marginTop);
              stickerRibbon.style.marginTop = (currentstickerRibbonMarginTop + 1) + "px";
            }
          }
    
          if (ImgOrientationLandscapeZeroPortraitOne === 1) {
            container.style.flexBasis = "calc(28% - 10px)";
          }
        }       
      });
      if (ImgOrientationLandscapeZeroPortraitOne === 1) {
        collectionScreenshot.style.width = "440px";
      }
    }
  } else {
    console.log("Either middle-side or collection-screenshot element is not found.");
  }
}

function ResizeElementBeforeCapture(TargetElementDiv){
      // Calculate the current width and height of middle-side
      var currentWidth = TargetElementDiv.offsetWidth;
      var currentHeight = TargetElementDiv.offsetHeight;  
      // Calculate the current size in megapixels
      var currentSize = currentWidth * currentHeight;
      // Check if the current size exceeds 3 megapixels
      if (currentSize > 1579008) {
        // Calculate the scale factor to resize the element proportionally
        var scaleFactor = Math.sqrt(1579008 / currentSize);  
        // Resize middle-side and all child elements proportionally
        TargetElementDiv.style.transform = `scale(${scaleFactor})`;
        TargetElementDiv.style.transformOrigin = "top left";
      }
}

function captureScreenshot(TargetElementID) {
  var collectionScreenshot = document.getElementById(TargetElementID);
  if (collectionScreenshot) {
    html2canvas(collectionScreenshot, { scale: 2, useCORS: true })
      .then(function (canvas) {
        if (navigator.userAgent.indexOf("Safari") > -1) {
          // For Safari, convert the canvas to a Blob object
          canvas.toBlob(function (blob) {
            // Create a temporary link element
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "mogotools-collection-screenshot.png";
            link.click();
          });
        } else {
          // For other browsers, convert the canvas to a data URL
          var dataURL = canvas.toDataURL("image/png");
          var link = document.createElement("a");
          link.href = dataURL;
          link.download = "mogotools-collection-screenshot.png";
          link.click();
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  } else {
    console.log("collection-screenshot element is not found.");
  }
}

var dlPngButton = document.getElementById("dl-png");
if (dlPngButton) {
  document.getElementById("collection-screenshot").style.display = "initial";
  document.getElementById("trade-screenshot").style.display = "none";
  dlPngButton.addEventListener("click", function () {
    document.getElementById("collection-screenshot").innerHTML = "";
    const DownloadingText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "Downloading")[CurrentLanguageCode];
    dlPngButton.textContent = DownloadingText;
    dlPngButton.classList.add("btnYellow");    
    document.getElementById("snapshot-area").style.width = "1200px";

    copyToCollectionScreenshot("collection-screenshot");
    var playerIGN = "";
    var playerLink = "";
    if (includeIGN === 1) {playerIGN = document.getElementById("player-ign").value;}
    if (includePlayerLink === 1) {playerLink = document.getElementById("player-link").value;}
    // Create the new element for player info
    const MyAlbumText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "MyAlbum")[CurrentLanguageCode];
    var snapshotHeaderElement = `
    <div id="collection-screenshot-player-info">
      <div id="collection-screenshot-player-name">${playerIGN}</div>
      <div id="collection-screenshot-my-album">${MyAlbumText}</div>
      <div id="collection-screenshot-player-link">${playerLink}</div>
    </div>
    `;
    const TimeNow = Math.floor(Date.now() / 1000);
    var snapshotFooterElement = `<div id="collection-screenshot-footer"><div id="collection-screenshot-footer-gamever">v1.21.2_${TimeNow}</div><div id="collection-screenshot-footer-link">https://mogotools.web.app/</div></div>`;
    var collectionScreenshot = document.getElementById("collection-screenshot");
    collectionScreenshot.innerHTML = snapshotHeaderElement + collectionScreenshot.innerHTML + snapshotFooterElement; 
    if (ImgOrientationLandscapeZeroPortraitOne === 1) {
      document.getElementById("collection-screenshot-footer-gamever").style.width = "50%";
      document.getElementById("collection-screenshot-footer-link").style.width = "50%";
    }   

    ResizeElementBeforeCapture(document.getElementById("collection-screenshot"));
    captureScreenshot("collection-screenshot");
    document.getElementById("collection-screenshot").innerHTML = "";
    document.getElementById("collection-screenshot").style.display = "none";
    setTimeout(function () {
      const DownloadSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadSuccessful")[CurrentLanguageCode];
      dlPngButton.textContent = DownloadSuccessfulText;
      setTimeout(function () {
        dlPngButton.classList.remove("btnYellow");
        const DownloadPNGBtnText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadPNGBtnText")[CurrentLanguageCode];
        dlPngButton.textContent = DownloadPNGBtnText;
      }, 3000);
    }, 3000);
  });
}

var dlTradePngButton = document.getElementById("dl-trade-png");
if (dlTradePngButton) {
  dlTradePngButton.addEventListener("click", function () {
    document.getElementById("collection-screenshot").style.display = "none";
    document.getElementById("trade-screenshot").style.display = "initial";
    document.getElementById("trade-screenshot-container").setAttribute("style", "");
    document.getElementById("fortrade-screenshot-area").style.height = "";
    document.getElementById("lookingfor-screenshot-area").style.height = "";


    document.getElementById("fortrade-screenshot-area").innerHTML = "";
    document.getElementById("lookingfor-screenshot-area").innerHTML = "";
    const DownloadingText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "Downloading")[CurrentLanguageCode];
    dlTradePngButton.textContent = DownloadingText;
    dlTradePngButton.classList.add("btnYellow");    
    // document.getElementById("trade-screenshot").style.width = "1200px";

    copyToTradeScreenshot("fortrade-screenshot-area", "fortrade");
    copyToTradeScreenshot("lookingfor-screenshot-area", "lookingfor");    
    document.getElementById("fortrade-screenshot-area").style.width = "400px";
    document.getElementById("fortrade-screenshot-area").style.background = "";
    document.getElementById("lookingfor-screenshot-area").style.width = "400px";
    document.getElementById("lookingfor-screenshot-area").style.background = "";
    
    document.getElementById("fortrade-screenshot-area").innerHTML = document.getElementById("fortrade-screenshot-area").innerHTML.replace(/sticker-card-container-screenshot/g, "sticker-card-container-screenshot-trade");
    document.getElementById("lookingfor-screenshot-area").innerHTML = document.getElementById("lookingfor-screenshot-area").innerHTML.replace(/sticker-card-container-screenshot/g, "sticker-card-container-screenshot-trade");

    var playerIGN = "";
    var playerLink = "";
    if (includeIGN === 1) {playerIGN = document.getElementById("player-ign").value;}
    if (includePlayerLink === 1) {playerLink = document.getElementById("player-link").value;}
    // Create the new element for player info
    const TimeNow = Math.floor(Date.now() / 1000);
    const MyTradeText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "MyTrade")[CurrentLanguageCode];
    if (document.getElementById("collection-screenshot-player-info") && document.getElementById("collection-screenshot-footer")) {
      document.getElementById("collection-screenshot-player-info").outerHTML = `
        <div id="collection-screenshot-player-info" style="width: 440px">
        <div id="collection-screenshot-player-name">${playerIGN}</div>
        <div id="collection-screenshot-my-album">${MyTradeText}</div>
        <div id="collection-screenshot-player-link">${playerLink}</div>
      </div>
      `
      document.getElementById("collection-screenshot-footer").outerHTML = `
      <div id="collection-screenshot-footer" style="width: 440px"><div id="collection-screenshot-footer-gamever">v1.21.2_${TimeNow}</div><div id="collection-screenshot-footer-link">https://mogotools.web.app/</div></div>
      `
    }
    else{
      var snapshotHeaderElement = `
      <div id="collection-screenshot-player-info" style="width: 440px">
        <div id="collection-screenshot-player-name">${playerIGN}</div>
        <div id="collection-screenshot-my-album">${MyTradeText}</div>
        <div id="collection-screenshot-player-link">${playerLink}</div>
      </div>
      `;
      
      var snapshotFooterElement = `<div id="collection-screenshot-footer" style="width: 440px"><div id="collection-screenshot-footer-gamever">v1.21.2_${TimeNow}</div><div id="collection-screenshot-footer-link">https://mogotools.web.app/</div></div>`;
      var tradeScreenshot = document.getElementById("trade-screenshot");
      tradeScreenshot.innerHTML = snapshotHeaderElement + tradeScreenshot.innerHTML + snapshotFooterElement; 
    }

    
    if (ImgOrientationLandscapeZeroPortraitOne === 0) {
      document.getElementById("trade-screenshot-container").style.display = "flex";
      document.getElementById("trade-screenshot-container").style.justifyContent = "center";
      document.getElementById("trade-screenshot-container").style.columnGap = "30px";
      document.getElementById("collection-screenshot-player-info").style.width = "900px";
      document.getElementById("collection-screenshot-footer").style.width = "900px";


      var fortradeScreenshotHeight = document.getElementById("fortrade-screenshot-area").offsetHeight;
      var lookingforScreenshotHeight = document.getElementById("lookingfor-screenshot-area").offsetHeight;
  
      if (fortradeScreenshotHeight > lookingforScreenshotHeight) {
        document.getElementById("fortrade-screenshot-area").style.height = fortradeScreenshotHeight + "px";
        document.getElementById("lookingfor-screenshot-area").style.height = fortradeScreenshotHeight + "px";
      } else {
        document.getElementById("fortrade-screenshot-area").style.height = lookingforScreenshotHeight + "px";
        document.getElementById("lookingfor-screenshot-area").style.height = lookingforScreenshotHeight + "px";
      }
    }

    //if(ImgOrientationLandscapeZeroPortraitOne === 1){}
    document.getElementById("trade-screenshot").style.background = `url("assets/background/Collections_Album_BG.png")`;
    ResizeElementBeforeCapture(document.getElementById("trade-screenshot"));
    captureScreenshot("trade-screenshot");
    document.getElementById("fortrade-screenshot-area").innerHTML = "";
    document.getElementById("lookingfor-screenshot-area").innerHTML = "";
    document.getElementById("trade-screenshot").style.display = "none";
    setTimeout(function () {
      const DownloadSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadSuccessful")[CurrentLanguageCode];
      dlTradePngButton.textContent = DownloadSuccessfulText;
      setTimeout(function () {
        dlTradePngButton.classList.remove("btnYellow");
        const DownloadPNGBtnText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadPNGBtnText")[CurrentLanguageCode];
        dlTradePngButton.textContent = DownloadPNGBtnText;
      }, 3000);
    }, 3000);
  });
}

function handleViewportBtnClick(isClicked) {
  if (isClicked === true) { WebZeroMobileOne = (WebZeroMobileOne + 1) % 2; }
  const ViewportBtnText = document.getElementById("ViewportBtnText");

  if (WebZeroMobileOne === 0) {
    document.getElementById("DefaultCSS").removeAttribute("disabled");
    document.getElementById("MobileCSS").setAttribute("disabled", true);
    document.getElementById("progress-menu-modal").style.display = "initial";
    document.getElementById("filter-sort-modal").style.display = "initial";
  } else if (WebZeroMobileOne === 1) {
    document.getElementById("DefaultCSS").setAttribute("disabled", true);
    document.getElementById("MobileCSS").removeAttribute("disabled");
    document.getElementById("filter-sort-modal").style.display = "none";
    document.getElementById("progress-menu-modal").style.display = "none";
  }  
  ViewportBtnText.setAttribute('data-translation-key', `ViewportBtnText_${WebZeroMobileOne}`);
  translateLanguage(CurrentLanguageCode, `ViewportBtnText_${WebZeroMobileOne}`);
}
document.getElementById("ViewportBtn").addEventListener("click", function () {
  handleViewportBtnClick(true);
});

function compareViewport() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (viewportWidth > viewportHeight) {
    WebZeroMobileOne = 0;
  } else {
    WebZeroMobileOne = 1;
  }
  handleViewportBtnClick(false);
}

function handleLayoutThemeBtnClick(isClicked) {
  if (isClicked === true) { LightZeroDarkOne = (LightZeroDarkOne + 1) % 2; }
  // console.log(LightZeroDarkOne);
  const LayoutBtnText = document.getElementById("LayoutBtnText");

  if (LightZeroDarkOne === 0) {
    //document.getElementById("DefaultCSS").removeAttribute("disabled");
    //document.getElementById("MobileCSS").setAttribute("disabled", true);
    LayoutBtnText.textContent = "Dark Mode";
  } else if (LightZeroDarkOne === 1) {
    //document.getElementById("DefaultCSS").setAttribute("disabled", true);
    //document.getElementById("MobileCSS").removeAttribute("disabled");
    LayoutBtnText.textContent = "Light Mode";
  }
}
document.getElementById("LayoutBtn").addEventListener("click", function () {
  handleLayoutThemeBtnClick(true);
});


var FilterSortModal = document.getElementById("filter-sort-modal");
var FilterSortMenuMobileOpenBtn = document.getElementById("mobileMenuFilters");
var FilterSortMenuMobileCloseBtn = document.getElementById("filter-sort-menu-footer");

var ProgressMenuModal = document.getElementById("progress-menu-modal");
var ProgressMenuMobileOpenBtn = document.getElementById("mobileMenuOptions");
var ProgressMenuMobileCloseBtn = document.getElementById("progress-menu-footer");

var CurrentFiltersModal = document.getElementById("current-filters-modal");
var CurrentFiltersOpenBtn = document.getElementById("ViewCurrentFiltersBtn");
var CurrentFiltersCloseBtn = document.getElementById("current-filters-footer");

var BasicMenuModal = document.getElementById("basic-menu-modal");
var BasicMenuMobileOpenBtn = document.getElementById("mobileBasicMenu");
var BasicMenuWebOpenBtn = document.getElementById("webBasicMenu");
var BasicMenuMobileCloseBtn = document.getElementById("basic-menu-footer");

FilterSortMenuMobileOpenBtn.onclick = function () {
  FilterSortModal.style.display = "block";
};

FilterSortMenuMobileCloseBtn.onclick = function () {
  FilterSortModal.style.display = "none";
};

ProgressMenuMobileOpenBtn.onclick = function () {
  ProgressMenuModal.style.display = "block";
};

ProgressMenuMobileCloseBtn.onclick = function () {
  ProgressMenuModal.style.display = "none";
};

CurrentFiltersOpenBtn.onclick = function () {
  CurrentFiltersModal.style.display = "block";
  generateCurrentFiltersModalText();
};

CurrentFiltersCloseBtn.onclick = function () {
  CurrentFiltersModal.style.display = "none";
};

function generateCurrentFiltersModalText() {
  const currentFiltersContent = document.getElementById("current-filters-content");
  currentFiltersContent.innerHTML = ""; // Empty the current-filters-content

  const includeFilters = [];
  const excludeFilters = [];

  for (const filter of Object.values(FilterList)) {
    const filterName = filter.FilterName;
    const filterState = filter.FilterState;
    const filterValue = filter.FilterValue;

    if (filterState === 1) {
      if (filterName === "1>StickerName>") {
        if (Array.isArray(filterValue)) {
          includeFilters.push(...filterValue.map((value) => `<span data-translation-key="IS"></span> "${value}"`));
        }
      } else if (filterName !== "0>spare>spare-filter-min|spare-filter-max") {
        const filterBtn = document.querySelector(`button[data-filtervalue="${filterName}"]`);
        if (filterBtn) {
          includeFilters.push(`<span data-translation-key="IS"></span> ${filterBtn.innerHTML}`);
        }
      }
    } else if (filterState === 2) {
      if (filterName === "1>StickerName>") {
        if (Array.isArray(filterValue)) {
          excludeFilters.push(...filterValue.map((value) => `<span data-translation-key="NOT"></span> "${value}"`));
        }
      } else if (filterName !== "0>spare>spare-filter-min|spare-filter-max") {
        const filterBtn = document.querySelector(`button[data-filtervalue="${filterName}"]`);
        if (filterBtn) {
          excludeFilters.push(`<span data-translation-key="NOT"></span> ${filterBtn.innerHTML}`);
        }
      }
    }
  }

  // const filterModeText = `Current filter mode: ${AndZeroOrOne === 0 ? "AND" : "OR"}`;
  const spareMinValue = document.getElementById("spare-filter-min").value;
  const spareMaxValue = document.getElementById("spare-filter-max").value;

  let filterModeDescription = "";
  const spareFilterState = FilterList["0>spare>spare-filter-min|spare-filter-max"].FilterState;

  // if (AndZeroOrOne === 0 && spareFilterState !== 0) {
  //   const filterStateText = spareFilterState === 2 ? "not between" : "between";
  //   filterModeDescription = `Stickers that match ALL filter conditions and have spares ${filterStateText} ${spareMinValue} and ${spareMaxValue} will be displayed in the board.`;
  // } else if (AndZeroOrOne === 0 && spareFilterState === 0) {
  //   filterModeDescription = `Stickers that match ALL filter conditions will be displayed in the board.`;
  // } else if (AndZeroOrOne === 1 && spareFilterState !== 0) {
  //   const filterStateText = spareFilterState === 2 ? "not between" : "between";
  //   filterModeDescription = `Stickers that match AT LEAST one of the filter conditions and have spares ${filterStateText} ${spareMinValue} and ${spareMaxValue} will be displayed in the board.`;
  // } else if (AndZeroOrOne === 1 && spareFilterState === 0) {
  //   filterModeDescription = `Stickers that match AT LEAST one of the filter conditions will be displayed in the board.`;
  // }

  const includeFiltersText = includeFilters.length > 0 ? `<b><span data-translation-key="IncludeFilters"></span></b><br><ul>\n${includeFilters.map(filter => `<li>${filter}</li>`).join("\n")}\n</ul>` : "";
  const excludeFiltersText = excludeFilters.length > 0 ? `<b><span data-translation-key="ExcludeFilters"></span></b><br><ul>\n${excludeFilters.map(filter => `<li>${filter}</li>`).join("\n")}\n</ul>` : "";

  //currentFiltersContent.innerHTML = `${filterModeText}<br><br>${filterModeDescription}<br><br>${includeFiltersText}<br>${excludeFiltersText}`;

  currentFiltersContent.innerHTML = `<span data-translation-key="ViewCurrentFiltersBtn_CurrentFilterModeText_${AndZeroOrOne}"></span><br><br><span data-translation-key="ViewCurrentFiltersBtn_CurrentFilterDescription_FilterMode${AndZeroOrOne}_SpareFilter${spareFilterState}"></span><br><br>${includeFiltersText}<br>${excludeFiltersText}`;

  const TranslationElements = currentFiltersContent.querySelectorAll('[data-translation-key]');
    TranslationElements.forEach(element => {
      const targetTranslationKey = element.dataset.translationKey;
      translateLanguage(CurrentLanguageCode, targetTranslationKey);
  });

  if(currentFiltersContent.innerHTML.includes("${spareMinValue}") && currentFiltersContent.innerHTML.includes("${spareMaxValue}")){
    currentFiltersContent.innerHTML = currentFiltersContent.innerHTML.replace("${spareMinValue}", spareMinValue).replace("${spareMaxValue}", spareMaxValue);
  }


}

BasicMenuMobileOpenBtn.onclick = function () {
  BasicMenuModal.style.display = "block";
};

BasicMenuWebOpenBtn.onclick = function () {
  BasicMenuModal.style.display = "block";
};

BasicMenuMobileCloseBtn.onclick = function () {
  BasicMenuModal.style.display = "none";
};


window.onclick = function (event) {
  if (event.target === FilterSortModal) {
    FilterSortModal.style.display = "none";
  }

  if (event.target === ProgressMenuModal) {
    ProgressMenuModal.style.display = "none";
  }

  if (event.target === BasicMenuModal) {
    BasicMenuModal.style.display = "none";
  }
};

document.getElementById("generate-trade-post-btn").addEventListener("click", function () {
  GenerateTradePostClipboard();
});

function GenerateTradePostClipboard() {
  const tradePostArea = document.querySelector(".trade-post-area");
  tradePostArea.value = ""; // Clear the trade post area

  let tradePostLinesLF = [];
  let tradePostLinesFT = [];

  for (const key in userData) {
    if (userData[key].lookingfor === 1 && userData[key].show === 1) {
      const globalId = userData[key].id;
      const sticker = STICKER_DATA.find(item => item["GlobalID"] === globalId);
      const StickerSpareValue = userData[key].spare;

      if (sticker) {
        const { SetID, AlbumNo, GlobalID, StickerRarity, Golden } = sticker;
        const StickerName = sticker[`StickerName${CurrentLanguageCode}`];
        const SetNo = SetID - AlbumNo * 100;
        const SetStickerNo = GlobalID - SetID * 100;
        var GoldenText = Golden === "1" ? `{G}` : '';
        var SpareValueText = StickerSpareValue > 0 ? `(x${StickerSpareValue})` : '';
        const tradePostLine = `- ${StickerName}, Set ${SetNo} #${SetStickerNo}, ${StickerRarity}★${GoldenText} ${SpareValueText}\n`;
        tradePostLinesLF.push(tradePostLine);
      }
    }

    if (userData[key].fortrade === 1 && userData[key].show === 1) {
      const globalId = userData[key].id;
      const sticker = STICKER_DATA.find(item => item["GlobalID"] === globalId);
      const StickerSpareValue = userData[key].spare;

      if (sticker) {
        const { SetID, AlbumNo, GlobalID, StickerRarity, Golden } = sticker;
        const StickerName = sticker[`StickerName${CurrentLanguageCode}`];
        const SetNo = SetID - AlbumNo * 100;
        const SetStickerNo = GlobalID - SetID * 100;
        var GoldenText = Golden === "1" ? `{G}` : '';
        var SpareValueText = StickerSpareValue > 0 ? `(x${StickerSpareValue})` : '';
        const tradePostLine = `- ${StickerName}, Set ${SetNo} #${SetStickerNo}, ${StickerRarity}★${GoldenText} ${SpareValueText}\n`;
        tradePostLinesFT.push(tradePostLine);
      }
    }
  }

  // Sort LF lines by Golden, StickerRarity, and GlobalID
  tradePostLinesLF.sort((a, b) => {
    const goldenA = a.includes("{G}");
    const goldenB = b.includes("{G}");
    if (goldenA !== goldenB) {
      return goldenB - goldenA;
    }

    const rarityA = Number(a.split("★")[0].split(",")[2]);
    const rarityB = Number(b.split("★")[0].split(",")[2]);
    if (rarityA !== rarityB) {
      return rarityB - rarityA;
    }

    const globalIDA = Number(a.split("Set ")[1].split(" #")[0]);
    const globalIDB = Number(b.split("Set ")[1].split(" #")[0]);
    return globalIDA - globalIDB;
  });

  // Sort FT lines by Golden, StickerRarity, and GlobalID
  tradePostLinesFT.sort((a, b) => {
    const goldenA = a.includes("{G}");
    const goldenB = b.includes("{G}");
    if (goldenA !== goldenB) {
      return goldenB - goldenA;
    }

    const rarityA = Number(a.split("★")[0].split(",")[2]);
    const rarityB = Number(b.split("★")[0].split(",")[2]);
    if (rarityA !== rarityB) {
      return rarityB - rarityA;
    }

    const globalIDA = Number(a.split("Set ")[1].split(" #")[0]);
    const globalIDB = Number(b.split("Set ")[1].split(" #")[0]);
    return globalIDA - globalIDB;
  });
  const LookingForText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "LookingFor_TradePost")[CurrentLanguageCode];
  const ForTradeText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "ForTrade_TradePost")[CurrentLanguageCode];
  const TradePostMessage = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "TradePostMessage")[CurrentLanguageCode];

  const tradePostText = `${LookingForText}\n${tradePostLinesLF.join("")}\n${ForTradeText}\n${tradePostLinesFT.join("")}\n${TradePostMessage}`;
  tradePostArea.value = tradePostText;
}

function copyTradePostAreaToClipboard() {
  const tradePostArea = document.querySelector(".trade-post-area");
  const tradePostText = tradePostArea.value;

  navigator.clipboard.writeText(tradePostText)
    .then(() => {
      const copyButton = document.querySelector("#copy-trade-post-area");
      const originalButtonText = copyButton.textContent;

      copyButton.classList.add("btnYellow");
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.classList.remove("btnYellow");
        copyButton.textContent = originalButtonText;
      }, 3000);

      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
const copyButton = document.querySelector("#copy-trade-post-area");
copyButton.addEventListener("click", copyTradePostAreaToClipboard);

document.getElementById("ToggleSelectedBtn").onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].selected = (userData[CurrentStickerGlobalID].selected + 1) % 2;
    RestoreSelected(userData, container);
  });
  countSelectedStickers();
}

document.getElementById("ResetSparesBtn").onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].spare = 0;
    RestoreStickerSpares(userData, container);
    ChangeUserDataHaveSpareValue(userData, container);
  });
  countVaultStickers();
}

document.getElementById("ToggleLFBtn").onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].lookingfor = (userData[CurrentStickerGlobalID].lookingfor + 1) % 2;
    RestoreTradeStates(userData, container);
  });
}

document.getElementById("ToggleFTBtn").onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].fortrade = (userData[CurrentStickerGlobalID].fortrade + 1) % 2;
    RestoreTradeStates(userData, container);
  });
}

document.getElementById("ResetLFBtn").onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].lookingfor = 0;
    RestoreTradeStates(userData, container);
  });
}

document.getElementById("ResetFTBtn").onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].fortrade = 0;
    RestoreTradeStates(userData, container);
  });
}

document.getElementById("ResetAllStickersBtn").onclick = function () {
  CreateNewUserData(STICKER_DATA);
  clearFilters();
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    RestoreSelected(userData, container);
    RestoreStickerSpares(userData, container);
    RestoreTradeStates(userData, container);
  })
  countSelectedStickers();
  countVaultStickers();
  generateCurrentStickerBoard(STICKER_DATA, userData, "current-sticker-board");
}

document.getElementById("leftover-total-vault-quantity").addEventListener("input", handleVaultPrestigeInput);

function handleVaultPrestigeInput(event) {
  const target = event.target;
  if (target.classList.contains("vault-prestige-text")) {
    target.value = target.value.replace(/^0+(?=\d)/, "");
    if (target.value > 9999) {
      if (target.value.slice(0, -1) === "9999") {
        target.value = "9999";
      } else {
        target.value = target.value.slice(0, 4);
      }
    } else if (target.value < 0) {
      target.value = 0;
    } else if (target.value === "") {
      setTimeout(() => {
        if (target.value === "") { // Check if value is still empty before setting it to 0
          target.value = 0;
          countVaultStickers(); // Call countVaultStickers() after setting value to 0
        }
      }, 5000); // Set 5s timeout for user to type before setting it to zero
      return; // Exit the function here to prevent countVaultStickers() from being called immediately
    }
  }
  countVaultStickers(); // Call countVaultStickers() outside the setTimeout delay
}


var accordionElements = document.getElementsByClassName("accordion");

for (var i = 0; i < accordionElements.length; i++) {
  accordionElements[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


function handleBasicMenuNavigationClick(event) {
  var navigationElements = document.getElementsByClassName("basic-menu-nav-btn");
  var contentElements = document.getElementsByClassName("basic-menu-subcontainer");

  // Remove .basic-menu-navigation-selected from all navigation elements
  for (var i = 0; i < navigationElements.length; i++) {
    navigationElements[i].classList.remove("basic-menu-navigation-selected");
  }

  // Add .basic-menu-navigation-selected to the clicked element
  event.target.classList.add("basic-menu-navigation-selected");

  // Set the display of the corresponding content based on the clicked element
  var selectedContentId = "";
  if (event.target.id === "BasicMenuNewsBtn") {
    selectedContentId = "news-content";
  } else if (event.target.id === "BasicMenuFAQBtn") {
    selectedContentId = "faq-info-content";
  } else if (event.target.id === "BasicMenuDisplayBtn") {
    selectedContentId = "display-settings-content";
  }

  // Set the display of the selected content to "initial" and the rest to "none"
  for (var j = 0; j < contentElements.length; j++) {
    if (contentElements[j].id === selectedContentId) {
      contentElements[j].style.display = "initial";
    } else {
      contentElements[j].style.display = "none";
    }
  }
}

// Attach the event listener to each navigation element
var navigationElements = document.getElementsByClassName("basic-menu-nav-btn");
for (var k = 0; k < navigationElements.length; k++) {
  navigationElements[k].addEventListener("click", handleBasicMenuNavigationClick);
}


const webBasicMenuImg = document.querySelector(".webBasicMenuImg");
if (webBasicMenuImg) {
  webBasicMenuImg.addEventListener("mousedown", () => {
    webBasicMenuImg.classList.add("scale-down");
  });

  webBasicMenuImg.addEventListener("mouseup", () => {
    webBasicMenuImg.classList.remove("scale-down");
  });

  webBasicMenuImg.addEventListener("mouseleave", () => {
    webBasicMenuImg.classList.remove("scale-down");
  });

  webBasicMenuImg.addEventListener("touchstart", () => {
    webBasicMenuImg.classList.add("scale-down");
  });

  webBasicMenuImg.addEventListener("touchend", () => {
    webBasicMenuImg.classList.remove("scale-down");
  });
}

function LoadNews() {
  const newsContent = document.getElementById("news-content");
  // Sort NEWS_DATA based on NewsTime in descending order
  const sortedNewsData = NEWS_DATA.sort((a, b) => b.NewsTime - a.NewsTime);

  sortedNewsData.forEach((item) => {
    const { NewsTime, NewsHeader, NewsContent } = item;
    // Create the HTML string for each news item
    const newsItemHTML = `
      <div class="basic-menu-news-item">
        <div class="basic-menu-news-item-header">
          <span class="news-item-time">${convertEpochToYYYYMMDD(parseInt(NewsTime))}</span> - ${NewsHeader}
        </div>
        <div class="basic-menu-news-item-content">${NewsContent}</div>
      </div><br>
    `;
    // Append the news item HTML to #news-content
    newsContent.innerHTML += newsItemHTML;
  });
  const currentTimeEpoch = Math.floor(new Date().getTime() / 1000);
  const isWithinTwoDays = sortedNewsData.some((item) => {
    const { NewsTime } = item;
    const timeDiff = currentTimeEpoch - NewsTime;
    const twoDaysInSeconds = 2 * 24 * 60 * 60;
    return timeDiff <= twoDaysInSeconds;
  });
  if (isWithinTwoDays) {
    if (WebZeroMobileOne === 0) {
      document.getElementById("webBasicMenu").click();
    } else if (WebZeroMobileOne === 1) {
      document.getElementById("mobileBasicMenu").click();
    }
  }
}

function convertEpochToYYYYMMDD(TimeValue) {
  const epoch = parseInt(TimeValue, 10);

  const date = new Date(epoch * 1000); // Convert seconds to milliseconds

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

function handleChangeStickerStyleBtn(isClicked) {
  if (isClicked === true) { StickerSelectedZeroShowOneBack = (StickerSelectedZeroShowOneBack + 1) % 2; }
  const ChangeStickerStyleBtnText = document.getElementById("ChangeStickerStyleBtnText");
  ChangeStickerStyleBtnText.setAttribute('data-translation-key', `ChangeStickerStyleBtnText_${StickerSelectedZeroShowOneBack}`);
  translateLanguage(CurrentLanguageCode, `ChangeStickerStyleBtnText_${StickerSelectedZeroShowOneBack}`);
}

document.getElementById("ChangeStickerStyleBtn").addEventListener("click", function() {
  handleChangeStickerStyleBtn(true);
  const StickerContainers = document.querySelectorAll(".sticker-card-container");
  const filteredContainers = Array.from(StickerContainers).filter(function(container) {
    const dataGlobalValue = container.getAttribute("data-global");
    return userData[dataGlobalValue].selected === 0;
  });
  filteredContainers.forEach(function(container) {
    ApplySelectedStyle(container);
  });
});

document.addEventListener('click', function(event) {
  var setLogo = event.target.closest('.set-logo');  
  if (setLogo) {
    const SetID = parseInt(setLogo.getAttribute("data-setidnumber"));
    var stickerCardContainer = Array.from(document.querySelectorAll('.sticker-card-container[data-global]')).find(function(container) {
      var globalAttr = container.getAttribute('data-global');
      return Math.floor(globalAttr / 100) === SetID;
    });
    if (stickerCardContainer) {
      stickerCardContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

document.addEventListener('mousedown', function(event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.add('scale-down');
  }
});

document.addEventListener('mouseup', function(event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.remove('scale-down');
  }
});

document.addEventListener('mouseleave', function(event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.remove('scale-down');
  }
});

document.addEventListener('touchstart', function(event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.add('scale-down');
  }
});

document.addEventListener('touchend', function(event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.remove('scale-down');
  }
});


function translateLanguage(languageCode, targetTranslationKey) {
  const elements = document.querySelectorAll('[data-translation-key]');

  elements.forEach(element => {
    const translationKey = element.dataset.translationKey;

    if (translationKey === targetTranslationKey) {
      const translationData = LANGUAGE_DICTIONARY.find(data => data['translation-key'] === translationKey);
      const translation = translationData ? translationData[languageCode] : '';

      if (element.tagName === 'TEXTAREA') {element.placeholder = translation;}
      else if (element.tagName === 'INPUT') {element.placeholder = translation;}
      else {element.textContent = translation;}
    }
  });
}

// function translateOnLoad(currentLanguageCode) {
//   const elements = document.querySelectorAll('[data-translation-key]');

//   elements.forEach(element => {
//     const targetTranslationKey = element.dataset.translationKey;
//     translateLanguage(currentLanguageCode, targetTranslationKey);
//   });
// }

const LanguageButtons = document.querySelectorAll('.translation-btn');
const TranslationElements = document.querySelectorAll('[data-translation-key]');

LanguageButtons.forEach(button => {
  button.addEventListener('click', function() {
    const ButtonLanguageCode = this.dataset.translationPointer;
    CurrentLanguageCode = ButtonLanguageCode;

    TranslationElements.forEach(element => {
      const targetTranslationKey = element.dataset.translationKey;
      translateLanguage(CurrentLanguageCode, targetTranslationKey);
    });    
    LanguageButtons.forEach(button => button.classList.remove("btnBlue"));
    this.classList.add("btnBlue");
    // Functions that need to replace variables
    countVaultStickers();
    generateCurrentFiltersModalText();
    document.querySelectorAll(".sticker-card-container").forEach(container => {TranslateStickerName(container, CurrentLanguageCode)});
    translateLanguage(CurrentLanguageCode, "set");
    translateLanguage(CurrentLanguageCode, "SpareLabel");
    TranslateSetName(CurrentLanguageCode);
  });    
});

function TranslateSetName(LanguageCode) {
  const setSpans = document.querySelectorAll("span.SetNameText[data-setid]");

  setSpans.forEach(span => {
    const setID = span.getAttribute("data-setid");
    const matchingSet = SET_DATA.find(set => set.SetID === setID);

    if (matchingSet && span.classList.contains("SetNameText")) {
      const setName = matchingSet[`SetName${LanguageCode}`];
      span.textContent = setName;
    }
  });
}

function TranslateStickerName(StickerCardContainer, LanguageCode) {
  const stickerSpans = StickerCardContainer.querySelector("span.StickerNameText[data-stickerid]");
  const stickerID = stickerSpans.getAttribute("data-stickerid");
  const matchingSticker = STICKER_DATA.find(sticker => sticker.GlobalID === stickerID);

  if (matchingSticker && stickerSpans.classList.contains("StickerNameText")) {
    const stickerName = matchingSticker[`StickerName${LanguageCode}`];
    stickerSpans.textContent = stickerName;
  }
}

window.onload = init;
