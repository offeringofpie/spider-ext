browser.contextMenus.create({
  id: "spider_read",
  title: "Spider Read",
  contexts: ["link"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "spider_read") {
    openTab(infor.linkUrl);
  }
});

browser.pageAction.onClicked.addListener((tab, onClickData) => {
  openTab(tab.url);
});

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

async function updateActiveTab(tabId, changeInfo, tab) {
  let gettingActiveTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  const currentTab = gettingActiveTab[0];
  if (["http:", "https:"].indexOf(new URL(currentTab.url).protocol) !== "-1") {
    browser.pageAction.show(currentTab.id);
  }
}

function openTab(url) {
  browser.tabs.create({
    url: `https://spider.jlopes.eu/?q=${url}`,
  });
}

// update when the extension loads initially
updateActiveTab();
