'use strict';

class DataMngr {//data access layer (DA) //deals with database
  constructor(model) { //model passed when creating a new mongoose object
    this.model = model;
  }

  read(id) {
    if (id) {
      return this.model.find({ _id: id });
    } else {
      return this.model.find({});
    }
  }

  create(obj) {
    const doc = new this.model(obj);
    return doc.save();
  }

  delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  update(id, obj) {
    return this.model.findByIdAndUpdate(id, obj, { new: true });
  }
}


//export class
module.exports = DataMngr;