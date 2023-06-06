export const waitForElm = (selector) => {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

export const getUrlPath = () => {
  return window.location.pathname.replace('/', '').replace('.php', '')
}

export const updateRevives = async (stats) => {
  const { revives } = await chrome.storage.sync.get(['revives'])
  revives.total++

  await chrome.storage.sync.set({
    revives
  })

  stats.total++

  return stats
}