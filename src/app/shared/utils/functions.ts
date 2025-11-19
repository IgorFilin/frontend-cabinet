function isJson(data: string) {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}

export { isJson };
