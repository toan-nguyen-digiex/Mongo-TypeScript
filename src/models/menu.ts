import mongoose from 'mongoose'

interface IMenu {
  title: string;
  description: string;
}

interface menuModelInterface extends mongoose.Model<MenuDoc> {
  build(attr: IMenu): MenuDoc
}

interface MenuDoc extends mongoose.Document {
  title: string;
  description: string;
}

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  }
})

menuSchema.statics.build = (attr: IMenu) => {
  return new Menu(attr)
}

const Menu = mongoose.model<MenuDoc, menuModelInterface>('Menu', menuSchema)

Menu.build({
  title: 'some title',
  description: 'some description'
})

export { Menu }




