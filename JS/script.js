//firebase deploy

import { STICKER_DATA } from "../Database/StickerData.js";
import { SET_DATA } from "../Database/SetData.js";
import { ALBUM_DATA } from "../Database/AlbumData.js";
import { NEWS_DATA } from "../Database/NewsData.js";
import { LANGUAGE_DICTIONARY } from "../Database/LanguageDictionary.js";

// CSS Spreadsheets
const DefaultCSSSheet = document.getElementById("DefaultCSS");
const MobileCSSSheet = document.getElementById("MobileCSS");

// Constant Elements
const MiddleSideBlock = document.getElementById("middle-side");
const CurrentStickerBoardBlock = document.querySelector("#sticker-board #current-sticker-board");
const BasicMenuNewsBtnComponent = document.getElementById("BasicMenuNewsBtn");
const LoadingOverlayBlock = document.getElementById("loading-overlay");
const IgnorePrestigeBtnComponent = document.getElementById("IgnorePrestigeBtn");
const SortOrderBtnComponent = document.getElementById("SortOrderBtn");
const FilterMenuSearchBarComponent = document.getElementById("filtermenu-searchbar");
const ClearFiltersBtnComponent = document.getElementById("ClearFiltersBtn");
const RefreshFiltersBtnComponent = document.getElementById("RefreshFiltersBtn");
const AndOrFilterModeBtnComponent = document.getElementById("AndOrFilterModeBtn");
const SpareFilterMinInputComponent = document.getElementById("spare-filter-min");
const SpareFilterMaxInputComponent = document.getElementById("spare-filter-max");
const SpareFilterBtnComponent = document.getElementById("spare-filter-btn");
const PlayerIGNInputComponent = document.getElementById("player-ign");
const PlayerLinkInputComponent = document.getElementById("player-link");
const LeftoverVaultStarsInputComponent = document.getElementById("leftover-total-vault-quantity");
const AlbumIconContainerBlock = document.getElementById("album-logo-container");
const SetImageOrientationBtnComponent = document.getElementById("SetImageOrientationBtn");
const IncludePlayerIGNBtnComponent = document.getElementById("IncludeIGNBtn");
const IncludePlayerLinkBtnComponent = document.getElementById("IncludePlayerLinkBtn");
const dlPngButtonComponent = document.getElementById("dl-png");
const CollectionScreenshotBlock = document.getElementById("collection-screenshot");
const TradeScreenshotBlock = document.getElementById("trade-screenshot");
const SnapshotAreaBlock = document.getElementById("snapshot-area");
const dlTradePngButtonComponent = document.getElementById("dl-trade-png");
const TradeScreenshotContainerBlock = document.getElementById("trade-screenshot-container");
const ForTradeScreenshotAreaBlock = document.getElementById("fortrade-screenshot-area");
const LookingForScreenshotAreaBlock = document.getElementById("lookingfor-screenshot-area");
const ViewportBtnComponent = document.getElementById("ViewportBtn");
const LayoutBtnComponent = document.getElementById("LayoutBtn");
const CurrentFiltersContentBlock = document.getElementById("current-filters-content");
const GenerateTradePostBtnComponent = document.getElementById("generate-trade-post-btn");
const ToggleSelectedBtnComponent = document.getElementById("ToggleSelectedBtn");
const ResetSparesBtnComponent = document.getElementById("ResetSparesBtn");
const ToggleLFBtnComponent = document.getElementById("ToggleLFBtn");
const ToggleFTBtnComponent = document.getElementById("ToggleFTBtn");
const ResetLFBtnComponent = document.getElementById("ResetLFBtn");
const ResetFTBtnComponent = document.getElementById("ResetFTBtn");
const ResetAllStickersBtnComponent = document.getElementById("ResetAllStickersBtn");
const NewsContentBlock = document.getElementById("news-content");
const ChangeStickerStyleBtnComponent = document.getElementById("ChangeStickerStyleBtn");
const ProfileListBlock = document.getElementById("profile-list");
const SetProgressTrackerBlock = document.getElementById("set-progress-tracker");
const ImportBtnComponent = document.getElementById("import-btn");
const ImportFromFileBtnComponent = document.getElementById("import-from-file-btn");
const ExportBtnComponent = document.getElementById("export-btn");
const ExportFromFileBtnComponent = document.getElementById("export-from-file-btn");
const ProfileTextAreaComponent = document.getElementById("backup-area");
const vaultTierImage = document.querySelector(".vault-tier");
const TradePostTextAreaComponent = document.querySelector(".trade-post-area");
const CopyTradePostAreaBtnComponent = document.getElementById("copy-trade-post-area");
const ManageProfileImg = document.querySelector(".ManageProfileImg");
const ChangeAlbumMenuBlock = document.getElementById("change-album-menu");

const FilterSortModal = document.getElementById("filter-sort-modal");
const FilterSortMenuMobileOpenBtn = document.getElementById("mobileMenuFilters");
const FilterSortMenuMobileCloseBtn = document.getElementById("filter-sort-menu-footer");

const ProgressMenuModal = document.getElementById("progress-menu-modal");
const ProgressMenuMobileOpenBtn = document.getElementById("mobileMenuOptions");
const ProgressMenuMobileCloseBtn = document.getElementById("progress-menu-footer");

const CurrentFiltersModal = document.getElementById("current-filters-modal");
const CurrentFiltersOpenBtn = document.getElementById("ViewCurrentFiltersBtn");
const CurrentFiltersCloseBtn = document.getElementById("current-filters-footer");

const ManageProfileModal = document.getElementById("manage-profile-modal");
const ManageProfileOpenBtn = document.getElementById("ManageProfileBtn");
const ManageProfileCloseBtn = document.getElementById("manage-profile-footer");

const BasicMenuModal = document.getElementById("basic-menu-modal");
const BasicMenuMobileOpenBtn = document.getElementById("mobileBasicMenu");
const BasicMenuWebOpenBtn = document.getElementById("webBasicMenu");
const BasicMenuMobileCloseBtn = document.getElementById("basic-menu-footer");


// Grouped Elements
const ButtonGroupTitleElementGroup = document.querySelectorAll(".btn-grp-title");
const AccordionElementGroup = document.querySelectorAll(".accordion");
const BasicMenuNavBtnElementGroup = document.querySelectorAll(".basic-menu-nav-btn");
const BasicMenuSubcontainerElementGroup = document.querySelectorAll(".basic-menu-subcontainer");
const SortBtnElementGroup = document.querySelectorAll(".sort-btn");
const FilterBtnElementGroup = document.querySelectorAll(".filter-btn");
const TradeButtonContainerBtnGroup = document.querySelectorAll(".trade-button-container .btn");
const StaticButtonsGroup = document.querySelectorAll(".btn");
const LanguageButtons = document.querySelectorAll('.translation-btn');
const TranslationElements = document.querySelectorAll('[data-translation-key]');


// Text Elements
const TierOneVaultQuantitySpan = document.getElementById("TierOneVaultQuantity");
const TierTwoVaultQuantitySpan = document.getElementById("TierTwoVaultQuantity");
const TierThreeVaultQuantitySpan = document.getElementById("TierThreeVaultQuantity");
const SortOrderBtnTextSpan = document.getElementById("SortOrderBtnText");
const FilterLengthTextSpan = document.getElementById("filterLength");
const AndOrFilterModeBtnTextSpan = document.getElementById("AndOrFilterModeBtnText");
const AndOrFilterModeBtnTooltipTextSpan = document.getElementById("AndOrFilterModeBtnTooltip");
const TotalGoldQuantityTextSpan = document.getElementById("total-gold-quantity");
const GoldQuantityTextSpan = document.getElementById("gold-quantity");
const GoldPercentageTextSpan = document.getElementById("gold-percentage");
const NextVaultCounterTextSpan = document.getElementById("NextVaultCounter");
const ViewportBtnTextSpan = document.getElementById("ViewportBtnText");
const LayoutBtnTextSpan = document.getElementById("LayoutBtnText");
const ChangeStickerStyleBtnTextSpan = document.getElementById("ChangeStickerStyleBtnText");
const TotalStickersQuantityTextSpan = document.getElementById("total-stickers-quantity");
const UserStickersQuantityTextSpan = document.getElementById("user-stickers-quantity");
const TotalVaultQuantityTextSpan = document.getElementById("total-vault-quantity");
const StartTimeTextSpan = document.getElementById("start-time");
const EndTimeTextSpan = document.getElementById("end-time");
const TimeLeftTextSpan = document.getElementById("time-left");
const CopyTradePostAreaBtnTextSpan = document.getElementById("copy-trade-post-area-btn-text");



let CurrentAlbumNumber = getCurrentAlbumNumber();
const VaultTierOne = 250;
const VaultTierTwo = 500;
const VaultTierThree = 700;
let userData = {};
let UserProfileList = JSON.parse(localStorage.getItem('UserProfileList')) || [];
const FilterList = {};

// SETTINGS VARIABLE
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

// Sets up the website
function init(callback) {
  InsertVaultTierQuantity();
  GenerateFilterSetButtons();
  GenerateChangeAlbumButtons();
  SetDefaultFilterStates();
  document.querySelector(`button[data-translation-pointer= ${CurrentLanguageCode}]`).click();

  // Check if userData exists in localStorage
  const LocaluserData = localStorage.getItem("userData");
  if (LocaluserData) {
    importUserData(LocaluserData);
    ProfileTextAreaComponent.value = LocaluserData;
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

  handleBasicMenuNavigationClick({ target: BasicMenuNewsBtnComponent });

  const btns = document.querySelectorAll('.change-album-btn');
  btns.forEach(btn => {
    const albumNumber = btn.getAttribute('data-album-number');
    if (albumNumber === CurrentAlbumNumber) {
      btn.classList.add('btnBlue');
    }
  });

  UpdateAlbumStartEndTime();
  callback();
}

// Runs when loading the entire site for the first time
window.onload = function () {
  //redirectToIndex();
  compareViewport();
  LoadingOverlayBlock.style.display = "block";

  setTimeout(() => {
    init(function () {
      LoadingOverlayBlock.style.display = "none";
      LoadNews();
    });
  }, 0);
}

function getCurrentAlbumNumber() {
  const currentEpochTime = Math.floor(Date.now() / 1000); // Convert current time to EPOCH
  let closestStartTime = 0; // Variable to store the closest start time
  let currentAlbumNumber = ""; // Variable to store the current album number
  // Iterate through the ALBUM_DATA array
  for (let i = 0; i < ALBUM_DATA.length; i++) {
    const album = ALBUM_DATA[i];
    const startTime = parseInt(album.StartTime);
    // Check if the album's start time is before the current time and closer than the previously found start time
    if (startTime <= currentEpochTime && (startTime > closestStartTime || closestStartTime === 0)) {
      closestStartTime = startTime;
      currentAlbumNumber = album.AlbumNo;
    }
  }
  // If no album fulfills the conditions, set currentAlbumNumber as the highest AlbumNo value found
  if (currentAlbumNumber === "") {
    let highestAlbumNo = 0;
    for (let i = 0; i < ALBUM_DATA.length; i++) {
      const album = ALBUM_DATA[i];
      const albumNo = parseInt(album.AlbumNo);
      if (albumNo > highestAlbumNo) {
        highestAlbumNo = albumNo;
      }
    }
    currentAlbumNumber = highestAlbumNo.toString();
  }
  return currentAlbumNumber;
}

function InsertVaultTierQuantity(){
  TierOneVaultQuantitySpan.textContent = VaultTierOne;
  TierTwoVaultQuantitySpan.textContent = VaultTierTwo;
  TierThreeVaultQuantitySpan.textContent = VaultTierThree;
}

function SetDefaultFilterStates() {
  const FilterOptions = document.querySelectorAll("[data-filtervalue]");
  FilterOptions.forEach(item => {
    const filterDataAttribute = item.getAttribute("data-filtervalue");
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
  userData = {};
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

    let stickerCardContainer = document.querySelector(`${stickerContainerSelector}[data-global="${globalId}"]`);

    const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);
    if (IgnorePrestige === 1 && stickerData.Prestige === "1") {
      if (stickerCardContainer) { stickerCardContainer.remove(); }
      continue;
    }

    if (userDataItem.show === 1) {
      if (!stickerCardContainer) {
        const stickerElement = CreateStickerElement(item, "sticker-card-container", "sticker-card", true);
        fragment.appendChild(stickerElement);
      }
    } else if (userDataItem.show === 0 && stickerCardContainer) {
      stickerCardContainer.remove();
    }
  }
  board.appendChild(fragment);
}

function getStickerClasses(StickerName, Colour) {
  let StickerNameClass = "sticker-name";
  if (StickerName.length > 14) { StickerNameClass = "sticker-name-long-min14"; }
  if (StickerName.length > 18) { StickerNameClass = "sticker-name-long-min18"; }
  if (isBrighterThan(Colour, "#CCCCCC")) { StickerNameClass += "-dark"; }
  return StickerNameClass;
}

function getFrameHTML(Golden) {
  return Golden === "1"
    ? `<img draggable="false" class="gold-frame" src="assets/stickers/BG_StickerSpecial.png">`
    : `<img draggable="false" class="normal-frame" src="assets/stickers/BG_StickerBasic.png">`;
}

function getRibbonStyle(Colour, RibbonEdgeColour, DarkenedColour) {
  return `background: ${RibbonEdgeColour}; 
          background: -moz-linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${Colour} 10%, ${Colour} 90%, ${RibbonEdgeColour} 100%); 
          background: -webkit-linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${Colour} 10%, ${Colour} 90%, ${RibbonEdgeColour} 100%); 
          background: linear-gradient(90deg, ${RibbonEdgeColour} 0%, ${Colour} 10%, ${Colour} 90%, ${RibbonEdgeColour} 100%); 
          border: 2px solid ${DarkenedColour};`;
}

function createStickerStructureContainerInnerHTML(item, StickerNameClass, FrameHTML, RibbonStyle, SetText, StickerSet, StickerSetNo, GlobalID, ImageClass, StickerSetPath, ImageSource, StickerRarity) {
  return `
      <div class="sticker-star-container">
        <img draggable="false" class="star-img" src="assets/stickers/Collections_Star_${StickerRarity}Star.png">
      </div>
      <div class="sticker-photo-container">
        <img draggable="false" class="${ImageClass}" src="stickers/${StickerSetPath}/${ImageSource}">
        ${FrameHTML}
      </div>
      <div class="sticker-ribbon" style="${RibbonStyle}">
        <span class="${StickerNameClass}">
          <span>
            <span data-translation-key="set">${SetText}</span>&nbsp;${StickerSet}&ensp;#${StickerSetNo}
          </span>
          <span class="StickerNameText" data-stickerid="${GlobalID}"></span>
        </span>
      </div>`;
}

function CreateStickerElement(item, ContainerClass, ImageClass, isTracking) {
  const { SetID, AlbumNo, GlobalID, AlbumName, Golden, StickerRarity, ImageSource, Colour } = item;
  const StickerName = item[`StickerName${CurrentLanguageCode}`];
  const StickerSet = SetID - AlbumNo * 100;
  const StickerSetPath = AlbumName;
  const StickerSetNo = GlobalID - SetID * 100;
  const DarkenedColour = DarkenColour(Colour, 15);
  const RibbonEdgeColour = DarkenColour(Colour, 5);
  const StickerNameClass = getStickerClasses(StickerName, Colour);
  const FrameHTML = getFrameHTML(Golden);
  const RibbonStyle = getRibbonStyle(Colour, RibbonEdgeColour, DarkenedColour);
  const SetText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "set")[CurrentLanguageCode];

  const container = document.createElement("div");
  container.dataset.global = GlobalID;
  container.classList.add(ContainerClass);
  const StickerStructureContainer = document.createElement("div");
  StickerStructureContainer.classList.add("sticker-structure-container");
  container.appendChild(StickerStructureContainer);
  StickerStructureContainer.innerHTML = createStickerStructureContainerInnerHTML(item, StickerNameClass, FrameHTML, RibbonStyle, SetText, StickerSet, StickerSetNo, GlobalID, ImageClass, StickerSetPath, ImageSource, StickerRarity);

  if (isTracking) {
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
  const { SetID, AlbumNo, GlobalID, AlbumName, Golden, StickerRarity, ImageSource, Colour } = stickerData;
  const StickerName = stickerData[`StickerName${CurrentLanguageCode}`];
  const userDataItem = userData[stickerData.GlobalID];
  const StickerStructureContainer = container.querySelector('.sticker-structure-container');
  const StickerSet = SetID - AlbumNo * 100;
  const StickerSetPath = AlbumName;
  const StickerSetNo = GlobalID - SetID * 100;
  const DarkenedColour = DarkenColour(Colour, 15);
  const RibbonEdgeColour = DarkenColour(Colour, 5);
  const StickerNameClass = getStickerClasses(StickerName, Colour);
  const FrameHTML = getFrameHTML(Golden);
  const RibbonStyle = getRibbonStyle(Colour, RibbonEdgeColour, DarkenedColour);
  const SetText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "set")[CurrentLanguageCode];

  StickerStructureContainer.innerHTML = createStickerStructureContainerInnerHTML(stickerData, StickerNameClass, FrameHTML, RibbonStyle, SetText, StickerSet, StickerSetNo, GlobalID, 'sticker-card', StickerSetPath, ImageSource, StickerRarity);

  if (userDataItem.selected === 0 && StickerSelectedZeroShowOneBack === 1) {
    const StickerWhenNotSelected = Golden === "1" ? `assets/stickers/CardBack_Special.png` : `assets/stickers/CardBack_Basic_0.png`;
    StickerStructureContainer.innerHTML = `
      <div class="sticker-star-container">
        <img draggable="false" class="star-img" src="assets/stickers/Collections_Star_${StickerRarity}Star_Grey.png">
      </div>
      <div class="sticker-photo-container">
        <img draggable="false" class="sticker-card" src="${StickerWhenNotSelected}">
      </div>
      <div class="sticker-ribbon-transparent">
        <span class="${StickerNameClass}" style="color: #9a9381;">
          <span>
            <span data-translation-key="set">${SetText}</span>&nbsp;${StickerSet}&ensp;#${StickerSetNo}
          </span>
          <span class="StickerNameText" data-stickerid="${GlobalID}"></span>
        </span>
      </div>`;
  }

  container.style.opacity = userDataItem.selected === 0 && StickerSelectedZeroShowOneBack === 0 ? '0.4' : '1.0';
  container.style.transition = '0.1s';
  TranslateStickerName(container, CurrentLanguageCode);

  const spareSpinnerContainer = container.querySelector('.spare-spinner-container');
  if (StickerSelectedZeroShowOneBack === 0) {
    spareSpinnerContainer.style.marginTop = '2px';
  } else if (StickerSelectedZeroShowOneBack === 1) {
    if (WebZeroMobileOne === 0) {
      spareSpinnerContainer.style.marginTop = userDataItem.selected === 0 ? '2px' : '2px';
    } else if (WebZeroMobileOne === 1) {
      const ribbonTransparent = container.querySelector('.sticker-ribbon-transparent');
      if (userDataItem.selected === 0) {
        // ribbonTransparent.style.marginTop = '-5.4rem';
        spareSpinnerContainer.style.marginTop = '2px';
      } else {
        spareSpinnerContainer.style.marginTop = '2px';
      }
    }
  }
}

function appendSpareSpinner(stickerElement) {
  const spareSpinnerContainer = document.createElement("div");
  spareSpinnerContainer.classList.add("spare-spinner-container");
  const SpareText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "SpareLabel")[CurrentLanguageCode];
  spareSpinnerContainer.innerHTML = `
    <div class="spare-field">
      <label for="SpareQuantity" class="spare-header" data-translation-key="SpareLabel">${SpareText}</label>
      <input type="number" inputmode="numeric" id="SpareQuantity" class="spare-text" name="SpareQuantity" min="0" max="100" value="0"size="3">
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
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("touchstart", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("touchend", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });

    button.addEventListener("click", (event) => {
      const button = event.target.closest(".lfft-btn");
      const globalID = button.closest(".sticker-card-container").getAttribute("data-global");
      const property = button.getAttribute("data-property");
      if (button) {
        updateLFOrFTValue(globalID, property);
      }
    });
  });
}

function updateLFOrFTValue(globalID, property) {
  // Get the LF or FT button element based on the property value
  const button = document.querySelector(`[data-global="${globalID}"] .trade-button-container .lfft-btn[data-property="${property}"]`);

  if (button) {
    // Update the userData property value
    userData[globalID][property] = ((userData[globalID][property]) + 1) % 2;

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

IgnorePrestigeBtnComponent.addEventListener("click", function () {
  IgnorePrestige = (IgnorePrestige + 1) % 2;
  if (IgnorePrestige === 1) { IgnorePrestigeBtnComponent.classList.add("btnGreen"); }
  else { IgnorePrestigeBtnComponent.classList.remove("btnGreen"); }
  GenerateFilterSetButtons();
  document.querySelector("#stickerset-filter .btn-subgroup").querySelectorAll(".filter-btn").forEach((button) => { ChangeFilterBtnStyle(button); })
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
TradeButtonContainerBtnGroup.forEach(function (button) {
  button.addEventListener("click", function () {
    const globalID = button.closest(".sticker-card-container").getAttribute("data-global");
    const property = button.getAttribute("data-property");
    updateLFOrFTValue(globalID, property);
  });
});


// Effects for ALL .btn buttons in the website
StaticButtonsGroup.forEach(button => {
  button.addEventListener("mousedown", () => {
    button.classList.add("scale-down");
    button.classList.add("btnYellowTransition");
  });
  button.addEventListener("mouseup", () => {
    button.classList.remove("scale-down");
    button.classList.remove("btnYellowTransition");
  });
  button.addEventListener("mouseleave", () => {
    button.classList.remove("scale-down");
    button.classList.remove("btnYellowTransition");
  });
  button.addEventListener("touchstart", () => {
    button.classList.add("scale-down");
    button.classList.add("btnYellowTransition");
  });
  button.addEventListener("touchend", () => {
    button.classList.remove("scale-down");
    button.classList.remove("btnYellowTransition");
  });
});

SortBtnElementGroup.forEach(button => {
  button.addEventListener("click", (event) => {
    PerformSort(event);
  });
});

function PerformSort(event) {
  const clickedButton = event.currentTarget;
  let toSortKey = clickedButton.dataset.sortType;

  const containers = Array.from(document.querySelectorAll("#current-sticker-board .sticker-card-container"));
  if (containers.length === 0) { return; }

  containers.sort((a, b) => {
    const aData = findStickerData(a.dataset.global);
    const bData = findStickerData(b.dataset.global);
    if(toSortKey === "StickerName"){toSortKey = `StickerName${CurrentLanguageCode}`;}

    const aValue = aData[toSortKey];
    const bValue = bData[toSortKey];    

    if (!isNaN(aValue) && !isNaN(bValue)) {
      const aNumericValue = parseFloat(aValue);
      const bNumericValue = parseFloat(bValue);
      if (aNumericValue === bNumericValue) {return compareStickerNames(aData, bData);}
      else {return aNumericValue - bNumericValue;}
    }

    if (aValue === bValue) {return compareStickerNames(aData, bData);}
    else {return aValue.localeCompare(bValue);}
  });

  if (clickedButton.dataset.sortOnsite === "selected") {
    const { selectedContainers, notSelectedContainers } = PerformSortOnsite(clickedButton);
    const parentElement = containers[0].parentElement;
    selectedContainers.forEach(container => parentElement.appendChild(container));
    notSelectedContainers.forEach(container => parentElement.appendChild(container));
  } else if (clickedButton.dataset.sortOnsite === "spare") {
    const { sortSpareContainers } = PerformSortOnsite(clickedButton);
    const parentElement = containers[0].parentElement;
    sortSpareContainers.forEach(container => parentElement.appendChild(container));
  } else {
    const parentElement = containers[0].parentElement;
    containers.forEach(container => parentElement.appendChild(container));
  }  
  if (AscendZeroDescendOne === 1) {
    Array.from(CurrentStickerBoardBlock.children).reverse().forEach(child => { CurrentStickerBoardBlock.appendChild(child); });
  }
  SortBtnElementGroup.forEach(button => button.classList.remove("btnBlue"));
  clickedButton.classList.add("btnBlue");
}

function PerformSortOnsite(clickedSortBtn) {
  const containerSelector = "#current-sticker-board .sticker-card-container";
  const containers = document.querySelectorAll(containerSelector);
  const prioritizeClassToSort = clickedSortBtn.dataset.sortOnsite;

  if (prioritizeClassToSort === "selected") {
    const selectedContainers = Array.from(containers).filter(container => {
      const dataGlobalValue = container.getAttribute("data-global");
      return userData[dataGlobalValue].selected === 1;
    });

    const notSelectedContainers = Array.from(containers).filter(container => {
      const dataGlobalValue = container.getAttribute("data-global");
      return userData[dataGlobalValue].selected === 0;
    });

    return { selectedContainers, notSelectedContainers };
  } else if (prioritizeClassToSort === "spare") {
    const sortSpareContainers = Array.from(containers).sort((a, b) => {
      const dataGlobalValueA = a.getAttribute("data-global");
      const dataGlobalValueB = b.getAttribute("data-global");
      const spareValueA = userData[dataGlobalValueA].spare;
      const spareValueB = userData[dataGlobalValueB].spare;
      return spareValueA - spareValueB;
    });
    return { sortSpareContainers, selectedContainers: [], notSelectedContainers: [] };
  };
  return { sortSpareContainers: [], selectedContainers: [], notSelectedContainers: [] };
}

SortBtnElementGroup.forEach(button => button.addEventListener("click", PerformSort));

function findStickerData(globalId) { return STICKER_DATA.find(item => item["GlobalID"] === globalId); }

function compareStickerNames(aData, bData) {
  const aName = aData["GlobalID"];
  const bName = bData["GlobalID"];
  return aName.localeCompare(bName);
}

function handleSortOrderBtnClick() {
  AscendZeroDescendOne = (AscendZeroDescendOne + 1) % 2;

  Array.from(CurrentStickerBoardBlock.children).reverse().forEach(child => { CurrentStickerBoardBlock.appendChild(child); });

  SortOrderBtnTextSpan.setAttribute('data-translation-key', `SortOrderBtnText_${AscendZeroDescendOne}`);
  translateLanguage(CurrentLanguageCode, `SortOrderBtnText_${AscendZeroDescendOne}`);
}

SortOrderBtnComponent.addEventListener("click", handleSortOrderBtnClick);


// SEARCH BAR (Filter)
function FilterBySearchbar(GlobalID) {
  
  const filterName = FilterMenuSearchBarComponent.getAttribute("data-filtervalue");

  if (FilterMenuSearchBarComponent.value === "") {
    FilterList[filterName].FilterState = 0;
    userData[GlobalID].show = 1;
    updateClearFiltersButton();
    return;
  }

  let filterValue = FilterMenuSearchBarComponent.value.trim();

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

  const stickerObject = STICKER_DATA.find(function (item) { return item.GlobalID === GlobalID; });
  const SetID = stickerObject.SetID;
  const setObject = SET_DATA.find(function (item) { return item.SetID === SetID; })
  const setNameOriginal = setObject[`SetName${CurrentLanguageCode}`];

  if (stickerObject) {
    const stickerName = stickerObject[`StickerName${CurrentLanguageCode}`].toLowerCase().replace(/é/g, "e").replace(/ü/g, "u").replace(/'/g, "").replace(/！/g, "!");
    const setName = setNameOriginal.toLowerCase().replace(/é/g, "e").replace(/ü/g, "u").replace(/'/g, "").replace(/！/g, "!");
    const lowercaseFilterValue = filterValue.map(function (value) {
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

FilterMenuSearchBarComponent.addEventListener("input", () => { PerformFilters(userData); });

document.addEventListener("click", function (event) {
  if (event.target.id === "ClearFilterMenuSearchBar") {
    FilterMenuSearchBarComponent.value = "";
    PerformFilters(userData);
  }
});

// FILTER (Filter)
FilterBtnElementGroup.forEach(button => {
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
  FilterLengthTextSpan.textContent = `(${filterLengthElement})`;
  ChangeClearFiltersButtonStyle();
}

function ChangeClearFiltersButtonStyle() {
  const filterLength = parseInt(FilterLengthTextSpan.textContent.replace(/\D/g, ''));
  if (filterLength > 0) {
    ClearFiltersBtnComponent.classList.add("btnRed");
  } else {
    ClearFiltersBtnComponent.classList.remove("btnRed");
  }
}

ClearFiltersBtnComponent.addEventListener("click", () => { clearFilters(); })
function clearFilters() {
  FilterMenuSearchBarComponent.value = "";
  Object.values(FilterList).forEach(item => {
    if (item.FilterState !== 0 && item.FilterName !== "1>StickerName>") {
      item.FilterState = 0;
      const FilterBtnSource = document.querySelector(`.filter-btn[data-filtervalue="${item.FilterName}"]`);
      ChangeFilterButtonState(FilterBtnSource, false);
    }
  })
  PerformFilters(userData);
}

RefreshFiltersBtnComponent.addEventListener("click", function () { PerformFilters(userData); })

AndOrFilterModeBtnComponent.addEventListener("click", function () {
  AndZeroOrOne = (AndZeroOrOne + 1) % 2;
  AndOrFilterModeBtnTextSpan.setAttribute('data-translation-key', `AndOrFilterModeBtnText_${AndZeroOrOne}`);
  translateLanguage(CurrentLanguageCode, `AndOrFilterModeBtnText_${AndZeroOrOne}`);
  AndOrFilterModeBtnTooltipTextSpan.setAttribute('data-translation-key', `AndOrFilterModeBtnTooltipText_${AndZeroOrOne}`);
  translateLanguage(CurrentLanguageCode, `AndOrFilterModeBtnTooltipText_${AndZeroOrOne}`);
  PerformFilters(userData);
});

function PerformFilters(userData) {
  for (const key in userData) {
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
          if (FilterMenuSearchBarComponent.value === "") {
            userData[key].show = 1;
          }
        }
        if ((userData[key].show === 0 && FilterMenuSearchBarComponent.value !== "")) {
          FilterBySearchbar(key);
        }
      }
    }
  }
  if (FilterMenuSearchBarComponent.value === "") { FilterList[FilterMenuSearchBarComponent.getAttribute("data-filtervalue")].FilterState = 0; }
  updateClearFiltersButton();
  if (CurrentStickerBoardBlock.querySelector(".current-sticker-board-none")) {
    CurrentStickerBoardBlock.querySelector(".current-sticker-board-none").remove();
  }
  CurrentStickerBoardBlock.style.alignContent = "";
  generateCurrentStickerBoard(STICKER_DATA, userData, "current-sticker-board");

  const containers = Array.from(document.querySelectorAll("#current-sticker-board .sticker-card-container"));
  if (containers.length === 0) {
    const NoMatchesFoundText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "NoMatchesFound")[CurrentLanguageCode];
    CurrentStickerBoardBlock.innerHTML = `<span class="current-sticker-board-none" data-translation-key="NoMatchesFound">${NoMatchesFoundText}</span>`;
    CurrentStickerBoardBlock.style.alignContent = "center";
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
  const sticker = STICKER_DATA.find(function (item) { return item.GlobalID === GlobalID; });
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
      const filterKeytemp = filter.FilterKey;
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
      const filterKeytemp = filter.FilterKey;
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
        const filterKeytemp = filter.FilterKey;

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
        const filterKeytemp = filter.FilterKey;
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
  Array.from(ButtonGroupTitleElementGroup).forEach(btnGroupTitle => {
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

ButtonGroupTitleElementGroup.forEach(btnGroupTitle => {
  btnGroupTitle.addEventListener("click", () => {
    const parentContainer = btnGroupTitle.parentElement;
    const filterBtnSubgroup = parentContainer.querySelectorAll(".btn-subgroup");
    filterBtnSubgroup.forEach(element => {
      element.classList.toggle("hidden");
    });
  });
});


const stickerContainer = CurrentStickerBoardBlock;
stickerContainer.addEventListener("input", function (event) {
  const target = event.target;
  const clickedStickerContainer = target.closest(".sticker-card-container");
  if (target.classList.contains("spare-text") && clickedStickerContainer) {
    target.value = target.value.replace(/^0+(?=\d)/, "");
    const dataGlobal = clickedStickerContainer.getAttribute("data-global");
    if (target.value > 100) {
      if (target.value.slice(0, -1) === "100") { target.value = "100"; }
      else { target.value = target.value.slice(0, 2); }
    } else if (target.value < 0) { target.value = 0; } else if (target.value === "") {
      setTimeout(() => { if (target.value === "") { target.value = 0; } }, 5000);
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
    ApplySelectedStyle(clickedStickerContainer)
    countVaultStickers();
  }
});



SpareFilterMinInputComponent.addEventListener("input", handleFilterInput);
SpareFilterMaxInputComponent.addEventListener("input", handleFilterInput);

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

function SwapSpareFilterMinMax(event) {
  if (parseInt(SpareFilterMinInputComponent.value) > parseInt(SpareFilterMaxInputComponent.value)) {
    let min = SpareFilterMaxInputComponent.value;
    let max = SpareFilterMinInputComponent.value;
    SpareFilterMinInputComponent.value = min;
    SpareFilterMaxInputComponent.value = max;
  }
}
SpareFilterBtnComponent.addEventListener("click", () => {
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
  // console.log(dataGlobalValue);
  // console.log(userData[dataGlobalValue].selected);
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
  const progressContainers = document.querySelectorAll(".progress-container");

  progressContainers.forEach(function(container) {
    let progressText = container.querySelector(".progress-text").textContent;
    progressText = progressText.replace(/\s/g, "");
    const progressValue = parseInt(progressText.split("/")[0]);
    const totalValue = parseInt(progressText.split("/")[1]);

    const progressBar = container.querySelector(".progress-bar");

    if (progressValue === 0) {
      progressBar.style.width = "0";
    } else {
      const progressPercentage = (progressValue / totalValue) * 100;

      progressBar.style.width = "100%";
      // progressBar.style.width = progressPercentage + "%";

      if (progressValue < totalValue) {
        // progressBar.style.borderRadius = "9px 0 0 9px";
        // progressBar.style.backgroundColor = "#34c7fb";
        progressBar.style.background = `linear-gradient(90deg, #34c7fb ${progressPercentage}%, var(--progress-bar-black) ${progressPercentage}%)`;
      } else {
        // progressBar.style.borderRadius = "9px";
        progressBar.style.background = "";
        progressBar.style.backgroundColor = "#37ad3f";
      }
    }
  });
}

function GenerateFilterSetButtons() {
  const filterBtnSubgroup = document.querySelector("#stickerset-filter .btn-subgroup");
  filterBtnSubgroup.innerHTML = SetProgressTrackerBlock.innerHTML = "";

  SET_DATA.filter(set => set["AlbumNo"] === CurrentAlbumNumber).forEach((set) => {
    const { SetID, Colour, AlbumNo } = set;
      const SetNo = parseInt(SetID) - parseInt(AlbumNo) * 100;
      const SetName = set[`SetName${CurrentLanguageCode}`];
      const SetImgSrc = `Icon_${SetID}.png`;
      const SetTotalStickers = STICKER_DATA.filter(sticker => sticker.SetID === SetID).length;
      const SetIsPrestige = set.Prestige;

      const existingButton = filterBtnSubgroup.querySelector(`[data-filtervalue="1>SetID>${SetID}"]`);
      const existingSetCardContainer = SetProgressTrackerBlock.querySelector(`[data-setidnumber="${SetID}"]`);

      const SetText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "set")[CurrentLanguageCode];

      if (IgnorePrestige === 1 && SetIsPrestige === "1") {
        if (existingButton) { existingButton.remove(); }
        if (existingSetCardContainer) { existingSetCardContainer.remove(); }
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
          if (isBrighterThan(Colour, "#CCCCCC")) {SetNameClass += "-dark";}
          const SetCardContainerElement = `
            <div class="set-card-container"><img draggable="false" data-setidnumber="${SetID}" class="set-logo" src="logo/${SetImgSrc}"><div class="${SetNameClass}" style="background-color: ${Colour};"><span><span data-translation-key="set">${SetText}</span> ${SetNo}</span><span class="SetNameText" data-setid="${SetID}"></span></div><div class="progress-container"><div class="progress-bar"></div><div class="progress-text"><span data-setid="${SetID}">0</span> / ${SetTotalStickers}</div></div></div>
          `;
          SetProgressTrackerBlock.innerHTML += SetCardContainerElement;
        }
      }    
  });
  translateLanguage(CurrentLanguageCode, "set");
  TranslateSetName(CurrentLanguageCode);
  const buttons = filterBtnSubgroup.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("touchstart", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("touchend", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
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

function exportUserData(SaveToLocalStorageBoolean) {
  Object.keys(userData).forEach((key) => {
    userData[key].spare = parseInt(userData[key].spare);
    userData[key] = { ...defaultValues, ...userData[key] };
  });

  const playerIGN = PlayerIGNInputComponent.value;
  const playerLink = PlayerLinkInputComponent.value;
  const LeftoverVaultStars = LeftoverVaultStarsInputComponent.value;
  const IsPrestigeStatus = (IgnorePrestige + 1) % 2;
  const additionalLines = [
    `CurrentAlbumNumber: ${CurrentAlbumNumber}`,
    `IsPrestige: ${IsPrestigeStatus}`,
    `player-ign: ${playerIGN}`,
    `player-link: ${playerLink}`,
    `leftover-vault-stars: ${LeftoverVaultStars}`,
  ];

  const userDataString = JSON.stringify(userData, null, 2);
  const updatedUserDataString = additionalLines.join("\n") + "\n" + userDataString;
  ProfileTextAreaComponent.value = updatedUserDataString;

  if (SaveToLocalStorageBoolean) {
    // Save updatedUserDataString in localStorage
    localStorage.setItem("userData", updatedUserDataString);  
    SaveToProfileList();
  }
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
    let userDataAlbumNumber = "";
    let IsPrestigeStatus = 1;
    const lines = userDataString.split("\n");
    lines.forEach((line, index) => {
      if (line.startsWith("CurrentAlbumNumber: ")) {
        userDataAlbumNumber = line.substring("CurrentAlbumNumber: ".length);
        if (userDataAlbumNumber !== CurrentAlbumNumber) {
          // console.error("Incorrect Album:", userDataAlbumNumber, ", new userData for the current album will be created.");
          // CreateNewUserData(STICKER_DATA);
          // throw new Error("Incorrect Album");
          if(ALBUM_DATA.find(item => item["AlbumNo"] === userDataAlbumNumber)){
            document.querySelector(`button[data-album-number = "${userDataAlbumNumber}"]`).click();
          } else {
            console.error("Incorrect Album:", userDataAlbumNumber, ", new userData for the current album will be created.");
            CreateNewUserData(STICKER_DATA);
            throw new Error("Incorrect Album");
          }
        }
      } else if (line.startsWith("IsPrestige: ")) {
        IsPrestigeStatus = parseInt(line.substring("IsPrestige: ".length));
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
    const filteredLines = lines.filter(line => !line.startsWith("CurrentAlbumNumber: ") && !line.startsWith("player-ign: ") && !line.startsWith("player-link: ") && !line.startsWith("leftover-vault-stars: ") && !line.startsWith("IsPrestige: "));
    const filteredUserDataString = filteredLines.join("\n");

    parsedData = JSON.parse(filteredUserDataString);

    // Check for missing keys and add default values
    Object.keys(parsedData).forEach((key) => {
      // Destructure the 'id' property from the object
      const { id, ...values } = parsedData[key];
      
      if (parseInt(STICKER_DATA.find(sticker => sticker.GlobalID === id).AlbumNo) !== parseInt(CurrentAlbumNumber)) {
        delete parsedData[key]; // Remove the entry if album number doesn't match
      } else {
        // Create a new object with the parsed values
        parsedData[key] = {
          id,
          ...Object.fromEntries(Object.entries(values).map(([key, value]) => [key, parseInt(value)]))
        };
      }
    });

    // Store player-ign and player-link values
    PlayerIGNInputComponent.value = playerIGN;
    PlayerLinkInputComponent.value = playerLink;
    LeftoverVaultStarsInputComponent.value = LeftoverVaultStars;

    userData = parsedData;
    clearFilters();
    const containers = document.querySelectorAll(".sticker-card-container");
    containers.forEach((container) => {
      if(userData[container.getAttribute("data-global")]){
        RestoreSelected(userData, container);
        RestoreStickerSpares(userData, container);
        RestoreTradeStates(userData, container);
        ChangeUserDataHaveSpareValue(userData, container);
      } else {
        const userDataItem = { ...defaultValues, id: container.getAttribute("data-global") };
        userData[container.getAttribute("data-global")] = userDataItem;
      }
    });
    if(IsPrestigeStatus === IgnorePrestige){IgnorePrestigeBtnComponent.click();}
    countVaultStickers();
    countSelectedStickers();
    //updateProgressBar();
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

ImportBtnComponent.addEventListener("click", () => {
  const ImportBtnComponentText = ImportBtnComponent.querySelector("#import-btn-text");
  const userDataString = ProfileTextAreaComponent.value.trim();
  importUserData(userDataString);
  setTimeout(function () {
    const ImportSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "ImportSuccessful")[CurrentLanguageCode];
    ImportBtnComponentText.textContent = ImportSuccessfulText;
    setTimeout(function () {
      ImportBtnComponentText.textContent = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "import")[CurrentLanguageCode];
    }, 3000);
  }, 0);
});

ImportFromFileBtnComponent.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt";
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const userDataString = event.target.result.trim();
      ProfileTextAreaComponent.value = userDataString;
      importUserData(userDataString);
    };
    reader.readAsText(file);
    const ImportFromFileBtnComponentText = ImportFromFileBtnComponent.querySelector("#import-from-file-btn-text");
    setTimeout(function () {
      const ImportSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "ImportSuccessful")[CurrentLanguageCode];
      ImportFromFileBtnComponentText.textContent = ImportSuccessfulText;
      setTimeout(function () {
        ImportFromFileBtnComponentText.textContent = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "LoadFromText")[CurrentLanguageCode];
      }, 3000);
    }, 0);
  });
  fileInput.click();
});

ExportBtnComponent.addEventListener("click", () => {
  exportUserData(true);
  const exportBtnText = ExportBtnComponent.querySelector("#export-btn-text");
  setTimeout(function () {
    const SaveSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "Saved")[CurrentLanguageCode];
    exportBtnText.textContent = SaveSuccessfulText;
    setTimeout(function () {
      exportBtnText.textContent = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "save")[CurrentLanguageCode];
    }, 3000);
  }, 0);
});

ExportFromFileBtnComponent.addEventListener("click", () => {
  exportUserData(false);
  const blob = new Blob([ProfileTextAreaComponent.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  // Create a formatted string for the current date and time
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const AlbumData = ALBUM_DATA.find(item => item["AlbumNo"] === CurrentAlbumNumber);
  const AlbumName = AlbumData[`AlbumName${CurrentLanguageCode}`].replace(/\s/g, '');
  // Set the filename to include the formatted date and time
  link.download = `mogotools-userData_${AlbumName}_${year}${month}${day}_${hours}${minutes}${seconds}.txt`;

  link.href = url;
  link.click();

  const exportFromFileBtnText = ExportFromFileBtnComponent.querySelector("#export-from-file-btn-text");
  setTimeout(function () {
    const SaveAsTxtSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "SaveAsTxtSuccessful")[CurrentLanguageCode];
    exportFromFileBtnText.textContent = SaveAsTxtSuccessfulText;
    setTimeout(function () {
      exportFromFileBtnText.textContent = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "SaveAsText")[CurrentLanguageCode];
    }, 3000);
  }, 0);
});

function UpdateTotalStickerQuantity() {
  let count = 0;
  STICKER_DATA.filter(sticker => sticker["AlbumNo"] === CurrentAlbumNumber).forEach((sticker) => {
    if (IgnorePrestige === 1 && sticker.Prestige === "1") { return; }
    count++;
  })
  TotalStickersQuantityTextSpan.textContent = count.toString();
}

function UpdateTotalStickerByRarityQuantity() {
  for (let RarityNumber = 1; RarityNumber <= 5; RarityNumber++) {
    const RarityQuantity = document.getElementById(`total-rarity${RarityNumber}-quantity`);
    let count = 0;

    STICKER_DATA.filter(sticker => sticker["AlbumNo"] === CurrentAlbumNumber && parseInt(sticker.StickerRarity) === RarityNumber).forEach((sticker) => {
      if (IgnorePrestige === 1 && sticker.Prestige === "1") { return; }
      count++;
    });

    RarityQuantity.textContent = count.toString();
  }
  let count = 0;

  STICKER_DATA.forEach((sticker) => {
    if (IgnorePrestige === 1 && sticker.Prestige === "1") { return; }
    if (parseInt(sticker.Golden) === 1 && sticker.AlbumNo === CurrentAlbumNumber) { count++; }
  });
  TotalGoldQuantityTextSpan.textContent = count.toString();
}

function countSelectedStickers() {
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

  UserStickersQuantityTextSpan.textContent = count.toString();
  countSelectedStickerByRarity();
  updateProgressBar();
}

function countSelectedStickerByRarity() {
  for (let RarityNumber = 1; RarityNumber <= 5; RarityNumber++) {
    document.getElementById(`rarity${RarityNumber}-quantity`).textContent = 0;
    document.getElementById(`rarity${RarityNumber}-percentage`).textContent = 0;
  }
  GoldQuantityTextSpan.textContent = 0;
  GoldPercentageTextSpan.textContent = 0;

  for (const key in userData) {
    const globalId = userData[key].id;
    const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);
    if (IgnorePrestige === 1 && stickerData.Prestige === "1") { continue; }

    else {
      if (userData.hasOwnProperty(key) && userData[key].selected === 1) {
        const StickerRarityNumber = stickerData.StickerRarity;
        document.getElementById(`rarity${StickerRarityNumber}-quantity`).textContent++;
        if (stickerData.Golden === "1") { GoldQuantityTextSpan.textContent++ }
      }
    }
  }

  for (let RarityNumber = 1; RarityNumber <= 5; RarityNumber++) {
    const StickerQuantity = parseInt(document.getElementById(`rarity${RarityNumber}-quantity`).textContent);
    const TotalStickerQuantity = parseInt(document.getElementById(`total-rarity${RarityNumber}-quantity`).textContent);
    const percentage = (StickerQuantity / TotalStickerQuantity * 100).toFixed(1);
    document.getElementById(`rarity${RarityNumber}-percentage`).textContent = `${percentage}%`;
  }

  const GoldenPercentage = (parseInt(GoldQuantityTextSpan.textContent) / parseInt(TotalGoldQuantityTextSpan.textContent) * 100).toFixed(1);
  GoldPercentageTextSpan.textContent = `${GoldenPercentage}%`;
}

function countVaultStickers() {

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

  let PrestigeLeftoverQuantity = LeftoverVaultStarsInputComponent.value;
  if (isNaN(PrestigeLeftoverQuantity)) {
    PrestigeLeftoverQuantity = 0;
  }

  const VaultSum = vaultQuantity + parseInt(PrestigeLeftoverQuantity);
  TotalVaultQuantityTextSpan.textContent = VaultSum.toString();

  let StickersToNextTier = 0;
  let nextTierText = "";

  NextVaultCounterTextSpan.style.display = "block";
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

  NextVaultCounterTextSpan.setAttribute("data-translation-key", nextTierText);
  translateLanguage(CurrentLanguageCode, nextTierText);
  let NextVaultCounterText = NextVaultCounterTextSpan.textContent;
  NextVaultCounterText = NextVaultCounterText.replace('${StickersToNextTier}', StickersToNextTier);
  if (VaultSum >= VaultTierThree) {
    const TierThreeVaultExchangeAmount = Math.floor(VaultSum / VaultTierThree);
    NextVaultCounterText = NextVaultCounterText.replace('${TierThreeVaultExchangeAmount}', TierThreeVaultExchangeAmount);
    if (NextVaultCounterText.includes("${times}")) {
      const times = TierThreeVaultExchangeAmount === 0 || TierThreeVaultExchangeAmount > 1 ? 'times' : 'time';
      NextVaultCounterText = NextVaultCounterText.replace('${times}', times);
    }
  }
  NextVaultCounterTextSpan.textContent = NextVaultCounterText;
}


function ChangeUserDataHaveSpareValue(userData, StickerContainer) {
  const dataGlobalValue = StickerContainer.getAttribute("data-global");
  if (userData[dataGlobalValue].selected === 1 && userData[dataGlobalValue].spare > 0) {
    userData[dataGlobalValue].havespare = 1;
  } else { userData[dataGlobalValue].havespare = 0; }
}

function UpdateAlbumStartEndTime() {  
  const AlbumData = ALBUM_DATA.find(item => item["AlbumNo"] === CurrentAlbumNumber);
  AlbumIconContainerBlock.innerHTML = `<img draggable="false" class="album-logo" src="logo/album_${CurrentAlbumNumber}.png" alt="${AlbumData.ImageSource}"</img>`;

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

  StartTimeTextSpan.textContent = startFormattedTime;
  EndTimeTextSpan.textContent = endFormattedTime;

  return endDateTime; // Return the endDateTime value
}

function updateTimeLeft(endDateTime) {
  
  const currentTime = new Date();
  const timeDiff = endDateTime.getTime() - currentTime.getTime();

  if (timeDiff <= 0) {
    const AlbumEndedText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "AlbumEndedText")[CurrentLanguageCode];
    TimeLeftTextSpan.textContent = AlbumEndedText;
    TimeLeftTextSpan.style.color = "";
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

    TimeLeftTextSpan.textContent = timeLeftString.trim();

    if (timeDiff <= 24 * 60 * 60 * 1000) { TimeLeftTextSpan.style.color = "red"; }
    else { TimeLeftTextSpan.style.color = ""; }
  }
}

let endDateTime = UpdateAlbumStartEndTime();
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
  SetImageOrientationBtnComponent.setAttribute('data-translation-key', `SetImageOrientationBtnText_${ImgOrientationLandscapeZeroPortraitOne}`);
  translateLanguage(CurrentLanguageCode, `SetImageOrientationBtnText_${ImgOrientationLandscapeZeroPortraitOne}`);
  //PerformFilters(userData);
}
SetImageOrientationBtnComponent.addEventListener("click", function () {
  handleSetImageOrientationBtnClick(true);
});

let includeIGN = 0;
let includePlayerLink = 0;
IncludePlayerIGNBtnComponent.addEventListener("click", function () {
  includeIGN = (includeIGN + 1) % 2;
  if (includeIGN === 1) { IncludePlayerIGNBtnComponent.classList.add("btnGreen"); }
  else { IncludePlayerIGNBtnComponent.classList.remove("btnGreen"); }
});
IncludePlayerLinkBtnComponent.addEventListener("click", function () {
  includePlayerLink = (includePlayerLink + 1) % 2;
  if (includePlayerLink === 1) { IncludePlayerLinkBtnComponent.classList.add("btnGreen"); }
  else { IncludePlayerLinkBtnComponent.classList.remove("btnGreen"); }
});

function copyToCollectionScreenshot(DestinationElement) {
  const collectionScreenshot = document.getElementById(DestinationElement);

  if (MiddleSideBlock && collectionScreenshot) {
    collectionScreenshot.innerHTML = "";

    let clonedContents = MiddleSideBlock.innerHTML;
    collectionScreenshot.style.backgroundColor = "rgba(248, 244, 228)";
    collectionScreenshot.setAttribute("style", MiddleSideBlock.getAttribute("style"));
    collectionScreenshot.style.background = `url("assets/background/Collections_Album_BG.png")`;

    // Replace class names in clonedContents
    clonedContents = clonedContents.replace(/sticker-card-container/g, "sticker-card-container-screenshot");
    clonedContents = clonedContents.replace(/trade-button-container/g, "trade-button-container-screenshot");
    collectionScreenshot.innerHTML = clonedContents;

    const screenshotContainers = collectionScreenshot.querySelectorAll(".sticker-card-container-screenshot");
    screenshotContainers.forEach(function (container) {
      
      container.querySelector(".trade-button-container-screenshot").style.width = "100%";
      container.querySelector(".trade-button-container-screenshot").style.display = "flex";   

      const globalID = container.getAttribute("data-global");
      const spanElement = document.createElement("span");
      spanElement.className = "spare-text-screenshot";
      spanElement.textContent = userData[globalID].spare;
      const spareTextElement = container.querySelector(".spare-text");

      if (spareTextElement) {
        spareTextElement.parentNode.replaceChild(spanElement, spareTextElement);
      }

      const spareSpinnerContainer = container.querySelector(".spare-spinner-container");

      if (spareSpinnerContainer) {
        spareSpinnerContainer.parentNode.removeChild(spareSpinnerContainer);
      }

      if (userData[globalID].spare > 0) {

        const stickerData = STICKER_DATA.find(item => item["GlobalID"] === globalID);
        let SpareImagePath = "Collections_TradingGroup_NumberBG_Small.png";  

        // SPARE CONTAINER
        const spareContainer = document.createElement("div");
        spareContainer.className = "spare-container-no-spinner";
        let SpareSnapshotTextClass = "spare-snapshot-text";
        if (stickerData.Golden === "1") {
          SpareImagePath = "GoldenBlitz_Stickers_Badge01.png";
          spareContainer.className = "spare-container-no-spinner-golden";
          SpareSnapshotTextClass = "spare-snapshot-text-golden";
        };        
        spareContainer.innerHTML = `
          <img draggable="false" class="spare-img" src="assets/stickers/${SpareImagePath}">
          <span class="${SpareSnapshotTextClass}">+${userData[globalID].spare}</span>
        `;

        // PLACE SPARE CONTAINER ELEMENT BEFORE STICKER RIBBON
        if (container.querySelector(".sticker-ribbon")) {
          const parentElement = container.querySelector(".sticker-ribbon").parentNode;
          parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon"));
        }
        if (container.querySelector(".sticker-ribbon-transparent")) {
          const parentElement = container.querySelector(".sticker-ribbon-transparent").parentNode;
          parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon-transparent"));
        }
        
        // SPECIAL PLACEMENT FOR SAFARI
        if (navigator.userAgent.indexOf("Safari") > -1) {
          const SpareSnapshotText = container.querySelector(".spare-snapshot-text");
          SpareSnapshotText.style.marginTop = (parseInt(SpareSnapshotText.style.marginTop) + 1) + "px";
          let stickerRibbon = "";
          if (container.querySelector(".sticker-ribbon")) {
            stickerRibbon = container.querySelector(".sticker-ribbon");
          }
          if (container.querySelector(".sticker-ribbon-transparent")) {
            stickerRibbon = container.querySelector(".sticker-ribbon-transparent");
          }
          stickerRibbon.style.marginTop = (parseInt(stickerRibbon.style.marginTop) + 1) + "px";
        }
      }
      
      if (container.querySelector(".sticker-ribbon")) {
        container.querySelector(".sticker-ribbon").style.transform = "translate(0, 306%)";
      }
      if (container.querySelector(".spare-container-no-spinner")) {
        container.querySelector(".spare-container-no-spinner").style.transform = "translate(0, 87px)";
      }
      if (container.querySelector(".spare-container-no-spinner-golden")) {
        container.querySelector(".spare-container-no-spinner-golden").style.transform = "translate(0, 87px)";
      }
      
      if(userData[globalID].selected === 0){
        if (container.querySelector(".spare-container-no-spinner")) {
          container.querySelector(".spare-container-no-spinner").style.transform = "translate(0, 95px)";
        }
        if (container.querySelector(".spare-container-no-spinner-golden")) {
          container.querySelector(".spare-container-no-spinner-golden").style.transform = "translate(0, 95px)";
        }
      }

      // Check if all ".lf-btn" in all ".trade-button-container-screenshot" have ".btnRed" class
      let allButtonsRed = true;
      const tradeButtonContainers = collectionScreenshot.querySelectorAll(".trade-button-container-screenshot");
      tradeButtonContainers.forEach(function (container) {
        const buttons = container.querySelectorAll(".lf-btn");
        buttons.forEach(function (button) {
          if (!button.classList.contains("btnRed")) {
            allButtonsRed = false;
          }
        });
      });
      // Set the opacity of all ".sticker-card-container-screenshot" elements based on the condition
      if (allButtonsRed) {
        const stickerCardContainers = collectionScreenshot.querySelectorAll(".sticker-card-container-screenshot");
        stickerCardContainers.forEach(function (container) {
          container.style.opacity = "1.0";
        });
      }      
    });
  } else {
    console.log("Either middle-side or collection-screenshot element is not found.");
  }
}

function copyToTradeScreenshot(DestinationElement, UserDataProperty) {
  const middleSide = CurrentStickerBoardBlock;
  const collectionScreenshot = document.getElementById(DestinationElement);
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
    else {
      for (const item of matchingItems) {
        const userDataItem = userData[item["GlobalID"]];
        const globalId = userDataItem.id;
        const stickerData = STICKER_DATA.find(sticker => sticker.GlobalID === globalId);

        if (IgnorePrestige === 1 && stickerData.Prestige === "1") { continue; }
        else {
          if (userDataItem[UserDataProperty] === 0) { continue; }
          else {
            const stickerElement = CreateStickerElement(item, "sticker-card-container", "sticker-card", true);
            fragment.appendChild(stickerElement);
          }
        }
        collectionScreenshot.appendChild(fragment);
      }

      // Replace class names in clonedContents
      collectionScreenshot.innerHTML = collectionScreenshot.innerHTML.replace(/sticker-card-container/g, "sticker-card-container-screenshot");

      const screenshotContainers = collectionScreenshot.querySelectorAll(".sticker-card-container-screenshot");
      screenshotContainers.forEach(function (container) {
        const globalID = container.getAttribute("data-global");
        const spanElement = document.createElement("span");
        spanElement.className = "spare-text-screenshot";
        spanElement.textContent = userData[globalID].spare;
        const spareTextElement = container.querySelector(".spare-text");

        if (userData[globalID][UserDataProperty] === 0) { container.remove(); }
        else {
          container.style.opacity = "1.0";
          container.querySelector(".trade-button-container").remove();
          if (spareTextElement) {
            spareTextElement.parentNode.replaceChild(spanElement, spareTextElement);
          }

          const spareSpinnerContainer = container.querySelector(".spare-spinner-container");

          if (spareSpinnerContainer) {
            spareSpinnerContainer.parentNode.removeChild(spareSpinnerContainer);
          }

          if (userData[globalID].spare > 0) {

            const stickerData = STICKER_DATA.find(item => item["GlobalID"] === globalID);
            let SpareImagePath = "Collections_TradingGroup_NumberBG_Small.png";  
    
            // SPARE CONTAINER
            const spareContainer = document.createElement("div");
            spareContainer.className = "spare-container-no-spinner";
            let SpareSnapshotTextClass = "spare-snapshot-text";
            if (stickerData.Golden === "1") {
              SpareImagePath = "GoldenBlitz_Stickers_Badge01.png";
              spareContainer.className = "spare-container-no-spinner-golden";
              SpareSnapshotTextClass = "spare-snapshot-text-golden";
            };        
            spareContainer.innerHTML = `
              <img draggable="false" class="spare-img" src="assets/stickers/${SpareImagePath}">
              <span class="${SpareSnapshotTextClass}">+${userData[globalID].spare}</span>
            `;
    
            // PLACE SPARE CONTAINER ELEMENT BEFORE STICKER RIBBON
            if (container.querySelector(".sticker-ribbon")) {
              const parentElement = container.querySelector(".sticker-ribbon").parentNode;
              parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon"));
            }
            if (container.querySelector(".sticker-ribbon-transparent")) {
              const parentElement = container.querySelector(".sticker-ribbon-transparent").parentNode;
              parentElement.insertBefore(spareContainer, container.querySelector(".sticker-ribbon-transparent"));
            }
            
            // SPECIAL PLACEMENT FOR SAFARI
            if (navigator.userAgent.indexOf("Safari") > -1) {
              const SpareSnapshotText = container.querySelector(".spare-snapshot-text");
              SpareSnapshotText.style.marginTop = (parseInt(SpareSnapshotText.style.marginTop) + 1) + "px";
              let stickerRibbon = "";
              if (container.querySelector(".sticker-ribbon")) {
                stickerRibbon = container.querySelector(".sticker-ribbon");
              }
              if (container.querySelector(".sticker-ribbon-transparent")) {
                stickerRibbon = container.querySelector(".sticker-ribbon-transparent");
              }
              stickerRibbon.style.marginTop = (parseInt(stickerRibbon.style.marginTop) + 1) + "px";
            }
          }

          if (container.querySelector(".sticker-ribbon")) {
            container.querySelector(".sticker-ribbon").style.transform = "translate(0, 306%)";
          }
          if (container.querySelector(".spare-container-no-spinner")) {
            container.querySelector(".spare-container-no-spinner").style.transform = "translate(0, 87px)";
          }
          if (container.querySelector(".spare-container-no-spinner-golden")) {
            container.querySelector(".spare-container-no-spinner-golden").style.transform = "translate(0, 87px)";
          }
          
          if(userData[globalID].selected === 0 && StickerSelectedZeroShowOneBack === 1){
            if (container.querySelector(".spare-container-no-spinner")) {
              container.querySelector(".spare-container-no-spinner").style.transform = "translate(0, 95px)";
            }
            if (container.querySelector(".spare-container-no-spinner-golden")) {
              container.querySelector(".spare-container-no-spinner-golden").style.transform = "translate(0, 95px)";
            }
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

function ResizeElementBeforeCapture(TargetElementDiv) {
  let currentWidth, currentHeight, currentSize, scaleFactor;

  currentWidth = TargetElementDiv.offsetWidth;
  currentHeight = TargetElementDiv.offsetHeight;
  currentSize = currentWidth * currentHeight;

  if (currentSize > 1579008) {
    scaleFactor = Math.sqrt(1579008 / currentSize);
    TargetElementDiv.style.transform = `scale(${scaleFactor})`;
    TargetElementDiv.style.transformOrigin = "top left";
  }
}

function captureScreenshot(TargetElementID) {
  const collectionScreenshot = document.getElementById(TargetElementID);
  if (collectionScreenshot) {
    html2canvas(collectionScreenshot, { scale: 2, useCORS: true })
      .then(function (canvas) {
        // Create a formatted string for the current date and time
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const seconds = String(currentDate.getSeconds()).padStart(2, "0");
        const AlbumData = ALBUM_DATA.find(item => item["AlbumNo"] === CurrentAlbumNumber);
        const AlbumName = AlbumData[`AlbumName${CurrentLanguageCode}`].replace(/\s/g, '');

        if (navigator.userAgent.indexOf("Safari") > -1) {
          // For Safari, convert the canvas to a Blob object
          canvas.toBlob(function (blob) {
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `mogotools-screenshot_${AlbumName}_${year}${month}${day}_${hours}${minutes}${seconds}.png`;
            link.click();
          });
        } else {
          // For other browsers, convert the canvas to a data URL
          const dataURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataURL;
          link.download = `mogotools-screenshot_${AlbumName}_${year}${month}${day}_${hours}${minutes}${seconds}.png`;
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

if (dlPngButtonComponent) {
  CollectionScreenshotBlock.style.display = "initial";
  TradeScreenshotBlock.style.display = "none";
  dlPngButtonComponent.addEventListener("click", function () {
    CollectionScreenshotBlock.innerHTML = "";
    const DownloadingText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "Downloading")[CurrentLanguageCode];
    const dlPngButtonText = dlPngButtonComponent.querySelector("#dl-png-btn-text");
    dlPngButtonText.textContent = DownloadingText;
    dlPngButtonComponent.classList.add("btnYellowTransition");

    if(ImgOrientationLandscapeZeroPortraitOne === 1){      
      SnapshotAreaBlock.style.width = "400px";
    } else{
      SnapshotAreaBlock.style.width = "1200px";
    }

    copyToCollectionScreenshot("collection-screenshot");
    let playerIGN = "";
    let playerLink = "";
    if (includeIGN === 1) { playerIGN = PlayerIGNInputComponent.value; }
    if (includePlayerLink === 1) { playerLink = PlayerLinkInputComponent.value; }
    // Create the new element for player info
    const AlbumData = ALBUM_DATA.find(item => item["AlbumNo"] === CurrentAlbumNumber);
    const MyAlbumText = AlbumData[`AlbumName${CurrentLanguageCode}`];
    //const MyAlbumText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "MyAlbum")[CurrentLanguageCode];
    const snapshotHeaderElement = `
    <div id="collection-screenshot-player-info">
      <div id="collection-screenshot-player-name">${playerIGN}</div>
      <div id="collection-screenshot-my-album">${MyAlbumText}</div>
      <div id="collection-screenshot-player-link">${playerLink}</div>
    </div>
    `;
    const TimeNow = Math.floor(Date.now() / 1000);
    const snapshotFooterElement = `<div id="collection-screenshot-footer"><div id="collection-screenshot-footer-time">${TimeNow}</div><div id="collection-screenshot-footer-link">https://mogotools.web.app/</div></div>`;
    const collectionScreenshot = CollectionScreenshotBlock;
    collectionScreenshot.innerHTML = snapshotHeaderElement + collectionScreenshot.innerHTML + snapshotFooterElement;
    
    ResizeElementBeforeCapture(CollectionScreenshotBlock);
    captureScreenshot("collection-screenshot");
    CollectionScreenshotBlock.innerHTML = "";
    CollectionScreenshotBlock.style.display = "none";
    setTimeout(function () {
      const DownloadSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadSuccessful")[CurrentLanguageCode];
      dlPngButtonText.textContent = DownloadSuccessfulText;
      setTimeout(function () {
        dlPngButtonComponent.classList.remove("btnYellowTransition");
        const DownloadPNGBtnText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadPNGBtnText")[CurrentLanguageCode];
        dlPngButtonText.textContent = DownloadPNGBtnText;
      }, 3000);
    }, 3000);
  });
}

if (dlTradePngButtonComponent) {
  dlTradePngButtonComponent.addEventListener("click", function () {
    document.getElementById("collection-screenshot").style.display = "none";
    document.getElementById("trade-screenshot").style.display = "initial";
    document.getElementById("trade-screenshot-container").setAttribute("style", "");
    document.getElementById("fortrade-screenshot-area").style.height = "";
    document.getElementById("lookingfor-screenshot-area").style.height = "";


    document.getElementById("fortrade-screenshot-area").innerHTML = "";
    document.getElementById("lookingfor-screenshot-area").innerHTML = "";
    const DownloadingText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "Downloading")[CurrentLanguageCode];
    const dlTradePngButtonText = document.querySelector("#dl-trade-png-btn-text");
    dlTradePngButtonText.textContent = DownloadingText;
    dlTradePngButtonComponent.classList.add("btnYellow");

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
    if (includeIGN === 1) { playerIGN = document.getElementById("player-ign").value; }
    if (includePlayerLink === 1) { playerLink = document.getElementById("player-link").value; }
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
      <div id="collection-screenshot-footer" style="width: 440px"><div id="collection-screenshot-footer-gamever">${TimeNow}</div><div id="collection-screenshot-footer-link">https://mogotools.web.app/</div></div>
      `
    }
    else {
      var snapshotHeaderElement = `
      <div id="collection-screenshot-player-info" style="width: 440px">
        <div id="collection-screenshot-player-name">${playerIGN}</div>
        <div id="collection-screenshot-my-album">${MyTradeText}</div>
        <div id="collection-screenshot-player-link">${playerLink}</div>
      </div>
      `;

      var snapshotFooterElement = `<div id="collection-screenshot-footer" style="width: 440px"><div id="collection-screenshot-footer-gamever">${TimeNow}</div><div id="collection-screenshot-footer-link">https://mogotools.web.app/</div></div>`;
      var tradeScreenshot = document.getElementById("trade-screenshot");
      tradeScreenshot.innerHTML = snapshotHeaderElement + tradeScreenshot.innerHTML + snapshotFooterElement;
    }

    if (ImgOrientationLandscapeZeroPortraitOne === 0) {
      document.getElementById("trade-screenshot-container").style.display = "flex";
      document.getElementById("trade-screenshot-container").style.justifyContent = "center";
      document.getElementById("trade-screenshot-container").style.columnGap = "30px";
      document.getElementById("collection-screenshot-player-info").style.width = "900px";
      document.getElementById("collection-screenshot-footer").style.width = "900px";


      var fortradeScreenshotHeight = document.getElementById("fortrade-screenshot-area").scrollHeight;
      var lookingforScreenshotHeight = document.getElementById("lookingfor-screenshot-area").scrollHeight;

      if (fortradeScreenshotHeight > lookingforScreenshotHeight) {
        document.getElementById("lookingfor-screenshot-area").style.height = "100%";
      } else {
        document.getElementById("fortrade-screenshot-area").style.height = "100%";
      }
    }

    document.getElementById("trade-screenshot").style.background = `url("assets/background/Collections_Album_BG.png")`;
    ResizeElementBeforeCapture(document.getElementById("trade-screenshot"));
    captureScreenshot("trade-screenshot");
    document.getElementById("fortrade-screenshot-area").innerHTML = "";
    document.getElementById("lookingfor-screenshot-area").innerHTML = "";
    document.getElementById("trade-screenshot").style.display = "none";
    setTimeout(function () {
      const DownloadSuccessfulText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadSuccessful")[CurrentLanguageCode];
      dlTradePngButtonText.textContent = DownloadSuccessfulText;
      setTimeout(function () {
        dlTradePngButtonComponent.classList.remove("btnYellow");
        const DownloadTradePNGBtnText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "DownloadTradePNGBtnText")[CurrentLanguageCode];
        dlTradePngButtonText.textContent = DownloadTradePNGBtnText;
      }, 3000);
    }, 3000);
  });
}

function handleViewportBtnClick(isClicked) {
  if (isClicked === true) { WebZeroMobileOne = (WebZeroMobileOne + 1) % 2; }

  if (WebZeroMobileOne === 0) {
    DefaultCSSSheet.removeAttribute("disabled");
    MobileCSSSheet.setAttribute("disabled", true);
    ProgressMenuModal.style.display = "initial";
    FilterSortModal.style.display = "initial";
  } else if (WebZeroMobileOne === 1) {
    DefaultCSSSheet.setAttribute("disabled", true);
    MobileCSSSheet.removeAttribute("disabled");
    FilterSortModal.style.display = "none";
    ProgressMenuModal.style.display = "none";
  }
  ViewportBtnTextSpan.setAttribute('data-translation-key', `ViewportBtnText_${WebZeroMobileOne}`);
  translateLanguage(CurrentLanguageCode, `ViewportBtnText_${WebZeroMobileOne}`);
}
ViewportBtnComponent.addEventListener("click", function () {
  handleViewportBtnClick(true);
});

function compareViewport() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (viewportWidth > viewportHeight) {
    WebZeroMobileOne = 0;
    ImgOrientationLandscapeZeroPortraitOne = 0;
  } else {
    WebZeroMobileOne = 1;
    ImgOrientationLandscapeZeroPortraitOne = 1;
  }
  handleViewportBtnClick(false);
  handleSetImageOrientationBtnClick(false);
}

function handleLayoutThemeBtnClick(isClicked) {
  if (isClicked === true) { LightZeroDarkOne = (LightZeroDarkOne + 1) % 2; }

  if (LightZeroDarkOne === 0) {
    //document.getElementById("DefaultCSS").removeAttribute("disabled");
    //document.getElementById("MobileCSS").setAttribute("disabled", true);
    LayoutBtnTextSpan.textContent = "Dark Mode";
  } else if (LightZeroDarkOne === 1) {
    //document.getElementById("DefaultCSS").setAttribute("disabled", true);
    //document.getElementById("MobileCSS").removeAttribute("disabled");
    LayoutBtnTextSpan.textContent = "Light Mode";
  }
}

LayoutBtnComponent.addEventListener("click", function () {
  handleLayoutThemeBtnClick(true);
});

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

ManageProfileOpenBtn.onclick = function () {
  ManageProfileModal.style.display = "block";
  OpenManageProfileMenu();
};

ManageProfileCloseBtn.onclick = function () {
  ManageProfileModal.style.display = "none";
};

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

  if (event.target === CurrentFiltersModal) {
    CurrentFiltersModal.style.display = "none";
  }

  if (event.target === ManageProfileModal) {
    ManageProfileModal.style.display = "none";
  }
};


function generateCurrentFiltersModalText() {
  CurrentFiltersContentBlock.innerHTML = ""; // Empty the current-filters-content

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

  const spareFilterState = FilterList["0>spare>spare-filter-min|spare-filter-max"].FilterState;

  const includeFiltersText = includeFilters.length > 0 ? `<b><span data-translation-key="IncludeFilters"></span></b><br><ul>\n${includeFilters.map(filter => `<li>${filter}</li>`).join("\n")}\n</ul>` : "";
  const excludeFiltersText = excludeFilters.length > 0 ? `<b><span data-translation-key="ExcludeFilters"></span></b><br><ul>\n${excludeFilters.map(filter => `<li>${filter}</li>`).join("\n")}\n</ul>` : "";

  const ShowOneResults = Object.keys(userData).filter(key => userData[key].show === 1).length;

  CurrentFiltersContentBlock.innerHTML = `<span data-translation-key="ViewCurrentFiltersBtn_CurrentFilterModeText_${AndZeroOrOne}"></span><br><br><span data-translation-key="ViewCurrentFiltersBtn_FoundText"></span>&nbsp;${ShowOneResults}&nbsp;<span data-translation-key="ViewCurrentFiltersBtn_StickerText"></span><br><br><span data-translation-key="ViewCurrentFiltersBtn_CurrentFilterDescription_FilterMode${AndZeroOrOne}_SpareFilter${spareFilterState}"></span><br><br>${includeFiltersText}<br>${excludeFiltersText}`;

  const TranslationElements = CurrentFiltersContentBlock.querySelectorAll('[data-translation-key]');
  TranslationElements.forEach(element => {
    const targetTranslationKey = element.dataset.translationKey;
    translateLanguage(CurrentLanguageCode, targetTranslationKey);
  });

  if (CurrentFiltersContentBlock.innerHTML.includes("${spareMinValue}") && CurrentFiltersContentBlock.innerHTML.includes("${spareMaxValue}")) {
    CurrentFiltersContentBlock.innerHTML = CurrentFiltersContentBlock.innerHTML.replace("${spareMinValue}", SpareFilterMinInputComponent.value).replace("${spareMaxValue}", SpareFilterMaxInputComponent.value);
  }


}

GenerateTradePostBtnComponent.addEventListener("click", function () {
  GenerateTradePostClipboard();
});

function GenerateTradePostClipboard() {
  TradePostTextAreaComponent.value = ""; // Clear the trade post area

  let tradePostLinesLF = [];
  let tradePostLinesFT = [];
  let raritiesLF = new Set();
  let raritiesFT = new Set();

  const addTradePostLine = (userDataEntry, tradePostLines, rarities, isGoldenSymbol) => {
    const globalId = userDataEntry.id;
    const sticker = STICKER_DATA.find(item => item["GlobalID"] === globalId);
    const StickerSpareValue = userDataEntry.spare;

    if (sticker) {
      const { SetID, AlbumNo, GlobalID, StickerRarity, Golden } = sticker;
      const StickerName = sticker[`StickerName${CurrentLanguageCode}`];
      const SetNo = SetID - AlbumNo * 100;
      const GoldenText = Golden === "1" ? isGoldenSymbol : '';
      const SpareValueText = StickerSpareValue > 0 ? `(x${StickerSpareValue})` : '';
      const tradePostLine = `- ${StickerName}, Set ${SetNo}, ${StickerRarity}★${GoldenText} ${SpareValueText}\n`;
      tradePostLines.push(tradePostLine);
      rarities.add(StickerRarity);
    }
  };

  for (const key in userData) {
    if (userData[key].lookingfor === 1 && userData[key].show === 1) {
      addTradePostLine(userData[key], tradePostLinesLF, raritiesLF, "(G)");
    }
    if (userData[key].fortrade === 1 && userData[key].show === 1) {
      addTradePostLine(userData[key], tradePostLinesFT, raritiesFT, "(G)");
    }
  }

  const sortTradePostLines = (lines, goldenSymbol) => {
    lines.sort((a, b) => {
      const goldenA = a.includes(goldenSymbol);
      const goldenB = b.includes(goldenSymbol);
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
  };

  sortTradePostLines(tradePostLinesLF, "(G)");
  sortTradePostLines(tradePostLinesFT, "(G)");

  const LookingForText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "LookingFor_TradePost")[CurrentLanguageCode];
  const ForTradeText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "ForTrade_TradePost")[CurrentLanguageCode];
  const TradePostMessage = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "TradePostMessage")[CurrentLanguageCode];

  let tradePostText = "";
  if (raritiesLF.size === 1 && raritiesFT.size === 1 && [...raritiesLF][0] === [...raritiesFT][0]) {
    const rarity = [...raritiesLF][0];
    tradePostText += `${rarity}★\n\n`;
    tradePostLinesLF = tradePostLinesLF.map(line => line.replace(`, ${rarity}★`, " "));
    tradePostLinesFT = tradePostLinesFT.map(line => line.replace(`, ${rarity}★`, " "));
  }

  tradePostText += `${LookingForText}\n${tradePostLinesLF.join("")}\n${ForTradeText}\n${tradePostLinesFT.join("")}\n${TradePostMessage}`;
  TradePostTextAreaComponent.value = tradePostText;
}

function copyTradePostAreaToClipboard() {
  const tradePostText = TradePostTextAreaComponent.value;

  navigator.clipboard.writeText(tradePostText)
    .then(() => {

      CopyTradePostAreaBtnComponent.classList.add("btnYellowTransition");
      const CopiedText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "copied")[CurrentLanguageCode];
      CopyTradePostAreaBtnTextSpan.textContent = CopiedText;
      setTimeout(() => {
        CopyTradePostAreaBtnComponent.classList.remove("btnYellowTransition");
        const CopyText = LANGUAGE_DICTIONARY.find(item => item["translation-key"] === "copy")[CurrentLanguageCode];
        CopyTradePostAreaBtnTextSpan.textContent = CopyText;
      }, 3000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

CopyTradePostAreaBtnComponent.addEventListener("click", copyTradePostAreaToClipboard);

ToggleSelectedBtnComponent.onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].selected = (userData[CurrentStickerGlobalID].selected + 1) % 2;
    RestoreSelected(userData, container);
  });
  countSelectedStickers();
}

ResetSparesBtnComponent.onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].spare = 0;
    RestoreStickerSpares(userData, container);
    ChangeUserDataHaveSpareValue(userData, container);
  });
  countVaultStickers();
}

ToggleLFBtnComponent.onclick = function () {
  console.log("hi");
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].lookingfor = (userData[CurrentStickerGlobalID].lookingfor + 1) % 2;
    RestoreTradeStates(userData, container);
  });
}

ToggleFTBtnComponent.onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].fortrade = (userData[CurrentStickerGlobalID].fortrade + 1) % 2;
    RestoreTradeStates(userData, container);
  });
}

ResetLFBtnComponent.onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].lookingfor = 0;
    RestoreTradeStates(userData, container);
  });
}

ResetFTBtnComponent.onclick = function () {
  const containers = document.querySelectorAll(".sticker-card-container");
  containers.forEach((container) => {
    const CurrentStickerGlobalID = container.getAttribute("data-global");
    userData[CurrentStickerGlobalID].fortrade = 0;
    RestoreTradeStates(userData, container);
  });
}

ResetAllStickersBtnComponent.onclick = function () {
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

LeftoverVaultStarsInputComponent.addEventListener("input", handleVaultPrestigeInput);

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

for (let i = 0; i < AccordionElementGroup.length; i++) {
  AccordionElementGroup[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function handleBasicMenuNavigationClick(event) {
  

  // Remove .basic-menu-navigation-selected from all navigation elements
  for (let i = 0; i < BasicMenuNavBtnElementGroup.length; i++) {
    BasicMenuNavBtnElementGroup[i].classList.remove("basic-menu-navigation-btn-selected");
  }

  // Add .basic-menu-navigation-selected to the clicked element
  event.target.classList.add("basic-menu-navigation-btn-selected");

  // Set the display of the corresponding content based on the clicked element
  let selectedContentId = "";
  if (event.target.id === "BasicMenuNewsBtn") {
    selectedContentId = "news-content";
  } else if (event.target.id === "BasicMenuFAQBtn") {
    selectedContentId = "faq-info-content";
  } else if (event.target.id === "BasicMenuDisplayBtn") {
    selectedContentId = "display-settings-content";
  }

  // Set the display of the selected content to "initial" and the rest to "none"
  for (let j = 0; j < BasicMenuSubcontainerElementGroup.length; j++) {
    if (BasicMenuSubcontainerElementGroup[j].id === selectedContentId) {
      BasicMenuSubcontainerElementGroup[j].style.display = "initial";
    } else {
      BasicMenuSubcontainerElementGroup[j].style.display = "none";
    }
  }
}

// Attach the event listener to each navigation element
for (let k = 0; k < BasicMenuNavBtnElementGroup.length; k++) {
  BasicMenuNavBtnElementGroup[k].addEventListener("click", handleBasicMenuNavigationClick);
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
  const currentTimeEpoch = Math.floor(new Date().getTime() / 1000);

  const sortedNewsData = NEWS_DATA
    .filter(item => item.NewsTime <= currentTimeEpoch) // Filter out news items later than current time
    .sort((a, b) => b.NewsTime - a.NewsTime); // Sort NEWS_DATA based on NewsTime in descending order

  sortedNewsData.forEach((item) => {
    const { NewsTime, NewsHeader, NewsContent } = item;
    const newsItemHTML = `
      <div class="basic-menu-news-item">
        <div class="basic-menu-news-item-header">
          <span class="news-item-time">${convertEpochToYYYYMMDD(parseInt(NewsTime))}</span> - ${NewsHeader}
        </div>
        <div class="basic-menu-news-item-content">${NewsContent}</div>
      </div><br>
    `;

    NewsContentBlock.innerHTML += newsItemHTML;
  });

  // Automatically loads news if the recent notice is within 1 day from current time
  const isWithinXDays = sortedNewsData.some((item) => {
    const { NewsTime } = item;
    const timeDiff = currentTimeEpoch - NewsTime;
    const XDaysInSeconds = 1 * 24 * 60 * 60;
    return timeDiff <= XDaysInSeconds;
  });

  if (isWithinXDays) {
    if (WebZeroMobileOne === 0) {
      BasicMenuWebOpenBtn.click();
    } else if (WebZeroMobileOne === 1) {
      BasicMenuMobileOpenBtn.click();
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
  ChangeStickerStyleBtnTextSpan.setAttribute('data-translation-key', `ChangeStickerStyleBtnText_${StickerSelectedZeroShowOneBack}`);
  translateLanguage(CurrentLanguageCode, `ChangeStickerStyleBtnText_${StickerSelectedZeroShowOneBack}`);
}

ChangeStickerStyleBtnComponent.addEventListener("click", function () {
  handleChangeStickerStyleBtn(true);
  const StickerContainers = document.querySelectorAll(".sticker-card-container");
  const filteredContainers = Array.from(StickerContainers).filter(function (container) {
    const dataGlobalValue = container.getAttribute("data-global");
    return userData[dataGlobalValue].selected === 0;
  });
  filteredContainers.forEach(function (container) {
    ApplySelectedStyle(container);
  });
});

document.addEventListener('click', function (event) {
  const setLogo = event.target.closest('.set-logo');
  if (setLogo) {
    const SetID = parseInt(setLogo.getAttribute("data-setidnumber"));
    const stickerCardContainer = Array.from(document.querySelectorAll('.sticker-card-container[data-global]')).find(function (container) {
      const globalAttr = container.getAttribute('data-global');
      return Math.floor(globalAttr / 100) === SetID;
    });
    if (stickerCardContainer) {
      stickerCardContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

document.addEventListener('mousedown', function (event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.add('scale-down');
  }
});

document.addEventListener('mouseup', function (event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.remove('scale-down');
  }
});

document.addEventListener('mouseleave', function (event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.remove('scale-down');
  }
});

document.addEventListener('touchstart', function (event) {
  if (event.target.classList.contains('set-logo')) {
    event.target.classList.add('scale-down');
  }
});

document.addEventListener('touchend', function (event) {
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

      if (element.tagName === 'TEXTAREA') { element.placeholder = translation; }
      else if (element.tagName === 'INPUT') { element.placeholder = translation; }
      else { element.textContent = translation; }
    }
  });
}

LanguageButtons.forEach(button => {
  button.addEventListener('click', function () {
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
    document.querySelectorAll(".sticker-card-container").forEach(container => { TranslateStickerName(container, CurrentLanguageCode) });
    translateLanguage(CurrentLanguageCode, "set");
    translateLanguage(CurrentLanguageCode, "album");
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
      let SetNameTextClassName = "set-name";
      if (setName.length >= 15) {
        SetNameTextClassName = "set-name-long-min15"; 
      }
      else if (setName.length >= 18) {
        SetNameTextClassName = "set-name-long-min18"; 
      }
      if (isBrighterThan(matchingSet.Colour, "#CCCCCC")) {
        SetNameTextClassName += "-dark";
      }
      span.parentElement.className = SetNameTextClassName;
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
    let StickerNameTextClassName = "sticker-name";
      if (stickerName.length >= 14) {
        StickerNameTextClassName = "sticker-name-long-min14"; 
      }
      else if (stickerName.length >= 18) {
        StickerNameTextClassName = "sticker-name-long-min18"; 
      }
      if (isBrighterThan(matchingSticker.Colour, "#CCCCCC")) {
        StickerNameTextClassName += "-dark";
      }
      stickerSpans.parentElement.className = StickerNameTextClassName;
  }
}

function GenerateChangeAlbumButtons() {

  ALBUM_DATA.forEach((album) => {
    const albumButtonElement = document.createElement('button');
    albumButtonElement.classList.add('change-album-btn', 'btn');
    albumButtonElement.setAttribute('type', 'button');
    albumButtonElement.setAttribute('data-album-number', album.AlbumNo);

    const buttonContent = `
      <span><span data-translation-key="album"></span>&nbsp;${album.AlbumNo}</span>
    `;

    albumButtonElement.innerHTML = buttonContent;
    ChangeAlbumMenuBlock.appendChild(albumButtonElement);
  });

  translateLanguage(CurrentLanguageCode, "album");

  const ChangeAlbumButtons = document.querySelectorAll('.change-album-btn');

  ChangeAlbumButtons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("touchstart", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("touchend", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });

    button.addEventListener('click', function () {
      clearFilters();  
      // Simulate click event on #ResetAllStickersBtn
      ResetAllStickersBtnComponent.click();
      if(IgnorePrestige === 1){IgnorePrestigeBtnComponent.click();}
      CurrentAlbumNumber = this.dataset.albumNumber;
      CurrentStickerBoardBlock.innerHTML = "";
      CreateNewUserData(STICKER_DATA);
      GenerateFilterSetButtons();
      SetDefaultFilterStates();
      generateCurrentStickerBoard(STICKER_DATA, userData, "current-sticker-board");
      document.querySelector(`button[data-translation-pointer= ${CurrentLanguageCode}]`).click();
      PerformSort({ currentTarget: document.querySelector("button[data-sort-type='GlobalID']") });
      NotSelectedByDefault();
      UpdateTotalStickerQuantity();
      UpdateTotalStickerByRarityQuantity();
      countSelectedStickers();
      countVaultStickers();
      endDateTime = UpdateAlbumStartEndTime();    
      
      ChangeAlbumButtons.forEach(button => button.classList.remove("btnBlue"));
      this.classList.add("btnBlue");
    });
  });
}

if (ManageProfileImg) {
  ManageProfileImg.addEventListener("mousedown", () => {
    ManageProfileImg.classList.add("scale-down");
  });

  ManageProfileImg.addEventListener("mouseup", () => {
    ManageProfileImg.classList.remove("scale-down");
  });

  ManageProfileImg.addEventListener("mouseleave", () => {
    ManageProfileImg.classList.remove("scale-down");
  });

  ManageProfileImg.addEventListener("touchstart", () => {
    ManageProfileImg.classList.add("scale-down");
  });

  ManageProfileImg.addEventListener("touchend", () => {
    ManageProfileImg.classList.remove("scale-down");
  });
}

function SaveToProfileList() {
  const LastModifiedTime = Date.now();
  const playerIGN = PlayerIGNInputComponent.value;
  const playerLink = PlayerLinkInputComponent.value;
  const LeftoverVaultStars = LeftoverVaultStarsInputComponent.value;
  const IsPrestigeStatus = (IgnorePrestige + 1) % 2;
  const userProfile = {
    ProfileAlbumNumber: CurrentAlbumNumber,
    ProfileIsPrestige: IsPrestigeStatus,
    ProfilePlayerIGN: playerIGN,
    ProfilePlayerLink: playerLink,
    ProfileLeftoverVaultStars: LeftoverVaultStars,
    ProfileLastModifiedTime: LastModifiedTime,
    ProfileUserData: userData
  };
  
  UserProfileList.push(userProfile);
  localStorage.setItem('UserProfileList', JSON.stringify(UserProfileList));
  
  // Rearrange the objects by LastModifiedTime
  UserProfileList.sort((a, b) => b.ProfileLastModifiedTime - a.ProfileLastModifiedTime);
  
  console.log(UserProfileList);
}

function OpenManageProfileMenu() {  
  // Rearrange the objects by LastModifiedTime
  UserProfileList.sort((a, b) => b.ProfileLastModifiedTime - a.ProfileLastModifiedTime);

  ProfileListBlock.innerHTML = "";

  UserProfileList.forEach(UserProfile => {
    const AlbumNumber = UserProfile.ProfileAlbumNumber;
    let IsPrestige = UserProfile.ProfileIsPrestige;
    let PrestigeStatusText = "";
    if(IsPrestige === 1){PrestigeStatusText = "Yes";} else {IsPrestige = 0; PrestigeStatusText = "No";}
    const ProfilePlayerIGN = UserProfile.ProfilePlayerIGN;
    const ProfileLastModifiedTime = convertEpochToYYYYMMDDHHMMSS(parseInt(UserProfile.ProfileLastModifiedTime));
    const AlbumData = ALBUM_DATA.find(item => item["AlbumNo"] === AlbumNumber);
    const AlbumName = AlbumData[`AlbumName${CurrentLanguageCode}`];
    const AlbumColour = AlbumData[`Colour`];
    const currentProfileIndex = UserProfileList.indexOf(UserProfile) + 1;

    let ProfileBlockElement = `
      <div class="profile-block" data-profile-time="${UserProfile.ProfileLastModifiedTime}">
        <div class="profile-info-container">
          <div class="profile-info-container-name">【${currentProfileIndex}】&emsp;${ProfilePlayerIGN}</div>
          <div class="profile-info-container-album" style="background-color: ${AlbumColour}"><span data-translation-key="album"></span>&nbsp;${AlbumNumber} - ${AlbumName}</div>
          <div class="profile-info-container-prestige"><span><span data-translation-key="IsPrestige"></span>&emsp;</span><span data-translation-key="${PrestigeStatusText}"></span></div>
          <div class="profile-info-container-time"><span><span data-translation-key="LastModified"></span>&emsp;</span>${ProfileLastModifiedTime}</div>
        </div>
        <div class="profile-options-container">
          <button class="btn profile-options-btn btnYellow LoadProfileBtn"><span data-translation-key="LoadProfileButtonText"></span></button>
          <button class="btn profile-options-btn btnGreen DownloadProfileBtn"><span data-translation-key="DownloadProfileButtonText"></span></button>
          <button class="btn profile-options-btn btnRed DeleteProfileBtn"><span data-translation-key="DeleteProfileButtonText"></span></button>
        </div>
      </div>
    `;

    ProfileListBlock.innerHTML += ProfileBlockElement;    
    translateLanguage(CurrentLanguageCode, PrestigeStatusText); 
  });

  translateLanguage(CurrentLanguageCode, "album");
  translateLanguage(CurrentLanguageCode, "LoadProfileButtonText");
  translateLanguage(CurrentLanguageCode, "DownloadProfileButtonText");
  translateLanguage(CurrentLanguageCode, "DeleteProfileButtonText");
  translateLanguage(CurrentLanguageCode, "LastModified");
  translateLanguage(CurrentLanguageCode, "IsPrestige"); 

  const ManageProfileButtons = document.querySelectorAll('.profile-options-btn');

  ManageProfileButtons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
    button.addEventListener("touchstart", () => {
      button.classList.add("scale-down");
      button.classList.add("btnYellowTransition");
    });
    button.addEventListener("touchend", () => {
      button.classList.remove("scale-down");
      button.classList.remove("btnYellowTransition");
    });
  });
}

// Manage Profiles - .DownloadProfileBtn
document.addEventListener('click', function (event) {
  const DownloadProfileBtn = event.target.closest('.DownloadProfileBtn');
  if (DownloadProfileBtn) {
    const profileBlock = DownloadProfileBtn.closest('.profile-block');
    const profileTime = profileBlock.getAttribute('data-profile-time');
    const profileIndex = UserProfileList.findIndex(profile => parseInt(profile.ProfileLastModifiedTime) === parseInt(profileTime));
    if (profileIndex !== -1) {
      const TargetUserProfile = UserProfileList[profileIndex];
      const UserDataToBeDownloaded = UserProfileList[profileIndex].ProfileUserData;

      Object.keys(UserDataToBeDownloaded).forEach((key) => {
        UserDataToBeDownloaded[key].spare = parseInt(UserDataToBeDownloaded[key].spare);
        UserDataToBeDownloaded[key] = { ...defaultValues, ...UserDataToBeDownloaded[key] };
      });
    
      const playerIGN = TargetUserProfile.ProfilePlayerIGN;
      const playerLink = TargetUserProfile.ProfilePlayerLink;
      const LeftoverVaultStars = TargetUserProfile.ProfileLeftoverVaultStars;
      const additionalLines = [
        `CurrentAlbumNumber: ${TargetUserProfile.ProfileAlbumNumber}`,
        `IsPrestige: ${TargetUserProfile.ProfileIsPrestige}`,
        `player-ign: ${playerIGN}`,
        `player-link: ${playerLink}`,
        `leftover-vault-stars: ${LeftoverVaultStars}`,
      ];
    
      const userDataString = JSON.stringify(UserDataToBeDownloaded, null, 2);
      const updatedUserDataString = additionalLines.join("\n") + "\n" + userDataString;
      const blob = new Blob([updatedUserDataString], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      // Create a formatted string for the current date and time
      const ProfileDate = new Date(TargetUserProfile.ProfileLastModifiedTime);
      const year = ProfileDate.getFullYear();
      const month = String(ProfileDate.getMonth() + 1).padStart(2, "0");
      const day = String(ProfileDate.getDate()).padStart(2, "0");
      const hours = String(ProfileDate.getHours()).padStart(2, "0");
      const minutes = String(ProfileDate.getMinutes()).padStart(2, "0");
      const seconds = String(ProfileDate.getSeconds()).padStart(2, "0");

      const AlbumData = ALBUM_DATA.find(item => item["AlbumNo"] === TargetUserProfile.ProfileAlbumNumber);
      const AlbumName = AlbumData[`AlbumName${CurrentLanguageCode}`].replace(/\s/g, '');
      // Set the filename to include the formatted date and time
      link.download = `mogotools-userData_${AlbumName}_${year}${month}${day}_${hours}${minutes}${seconds}.txt`;
      link.href = url;
      link.click();
    }
  }
});

// Manage Profiles - .DeleteProfileBtn
document.addEventListener('click', function (event) {
  const DeleteProfileBtn = event.target.closest('.DeleteProfileBtn');
  if (DeleteProfileBtn) {
    const profileBlock = DeleteProfileBtn.closest('.profile-block');
    const profileTime = profileBlock.getAttribute('data-profile-time');
    const profileIndex = UserProfileList.findIndex(profile => parseInt(profile.ProfileLastModifiedTime) === parseInt(profileTime));
    console.log(profileTime);
    if (profileIndex !== -1) {
      UserProfileList.splice(profileIndex, 1); // Remove the profile from the array
      localStorage.setItem('UserProfileList', JSON.stringify(UserProfileList));
      OpenManageProfileMenu();
    }
  }
});

// Manage Profiles - .LoadProfileBtn
document.addEventListener('click', function (event) {
  var LoadProfileBtn = event.target.closest('.LoadProfileBtn');
  if (LoadProfileBtn) {
    const profileBlock = LoadProfileBtn.closest('.profile-block');
    const profileTime = profileBlock.getAttribute('data-profile-time');
    const profileIndex = UserProfileList.findIndex(profile => parseInt(profile.ProfileLastModifiedTime) === parseInt(profileTime));
    if (profileIndex !== -1) {
      clearFilters();  
      ResetAllStickersBtnComponent.click();

      const TargetUserProfile = UserProfileList[profileIndex];
      const UserDataToBeLoaded = UserProfileList[profileIndex].ProfileUserData;

      CurrentAlbumNumber = TargetUserProfile.ProfileAlbumNumber;
      PlayerIGNInputComponent.value = TargetUserProfile.ProfilePlayerIGN;
      PlayerLinkInputComponent.value = TargetUserProfile.ProfilePlayerLink;
      LeftoverVaultStarsInputComponent.value = TargetUserProfile.ProfileLeftoverVaultStars;
      userData = UserDataToBeLoaded;
      // Check for missing keys and add default values
      Object.keys(userData).forEach((key) => {
        const { id, ...values } = userData[key];        
        if (parseInt(STICKER_DATA.find(sticker => sticker.GlobalID === id).AlbumNo) !== parseInt(CurrentAlbumNumber)) {
          delete userData[key];
        } else {
          userData[key] = {
            id,
            ...Object.fromEntries(Object.entries(values).map(([key, value]) => [key, parseInt(value)]))
          };
        }
      });      
      
      CurrentStickerBoardBlock.innerHTML = "";
      GenerateFilterSetButtons();
      SetDefaultFilterStates();
      generateCurrentStickerBoard(STICKER_DATA, userData, "current-sticker-board");
      document.querySelector(`button[data-translation-pointer= ${CurrentLanguageCode}]`).click();
      PerformSort({ currentTarget: document.querySelector("button[data-sort-type='GlobalID']") });
      NotSelectedByDefault();

      if(TargetUserProfile.ProfileIsPrestige === IgnorePrestige){IgnorePrestigeBtnComponent.click();}

      UpdateTotalStickerQuantity();
      UpdateTotalStickerByRarityQuantity();

      countSelectedStickers();
      countVaultStickers();
      endDateTime = UpdateAlbumStartEndTime();
      
      exportUserData(false);

      const ChangeAlbumButtons = document.querySelectorAll('.change-album-btn');
      ChangeAlbumButtons.forEach(btn => {
        if (btn.getAttribute('data-album-number') === CurrentAlbumNumber) {
          btn.classList.add('btnBlue');
        } else {btn.classList.remove('btnBlue');}
      });
      ManageProfileModal.style.display = "none";
    }
  }
});

function convertEpochToYYYYMMDDHHMMSS(epochTime) {
  const date = new Date(epochTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}