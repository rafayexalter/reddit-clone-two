export const fetchData = async (url) => {
  const res = await (await fetch(url)).json();
  return res;
};
