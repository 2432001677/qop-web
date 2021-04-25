const handleOpen = (fn) => (value) => () => fn(value);

export { handleOpen };
