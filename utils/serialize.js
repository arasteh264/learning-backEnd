exports.serialize = (doc) => {
  if (!doc) return doc;

  const obj = doc.toObject ? doc.toObject() : doc;

  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;

  return obj;
};