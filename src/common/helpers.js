async function pauseMillisec(milliseconds) {
  const pausePromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), milliseconds);
  });

  await pausePromise;
}

export { pauseMillisec };
