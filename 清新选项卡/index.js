const tabContainer = document.querySelector(".tabs");
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content > *");

//% 切换选项卡函数
tabContainer.addEventListener("click", ({ target: currentTab }) => {
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
    currentTab.classList.add("active");
    changeTab(currentTab.id);
})

// $切换内容函数
const changeTab = (tabId) => {
    const newTab = document.querySelector(`div[data-tab=${tabId}]`);
    tabContents.forEach((content) => {
        content.style.display = "none";
    });
    newTab.style.display = "block";
};

