const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.addObject = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  if (!data.obj_id) {
    return res.status(400).send('obj_id is required');
  }
  await db.collection('objects').doc(data.obj_id).set(data);
  res.status(200).send('Object added');
});

exports.getObject = functions.https.onRequest(async (req, res) => {
  const objId = req.query.obj_id;
  if (!objId) {
    return res.status(400).send('obj_id is required');
  }
  const doc = await db.collection('objects').doc(objId).get();
  if (!doc.exists) {
    return res.status(404).send('No such document!');
  }
  res.status(200).json(doc.data());
});

exports.deleteObject = functions.https.onRequest(async (req, res) => {
  const objId = req.query.obj_id;
  if (!objId) {
    return res.status(400).send('obj_id is required');
  }
  await db.collection('objects').doc(objId).delete();
  res.status(200).send('Object deleted');
});

exports.getAllObjects = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection('objects').get();
  let objects = [];
  snapshot.forEach(doc => {
    objects.push(doc.data());
  });
  res.status(200).json(objects);
});
