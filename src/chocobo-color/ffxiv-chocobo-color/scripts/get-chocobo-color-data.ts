import fs from 'fs'
import path from 'path'
import * as sc from '../../../saint-coinach'

/* eslint-disable @typescript-eslint/naming-convention */
const Item_en = sc.requireCsv('Item', 'en')
const Item_de = sc.requireCsv('Item', 'de')
const Item_fr = sc.requireCsv('Item', 'fr')
const Item_ja = sc.requireCsv('Item', 'ja')
const Item_ko = sc.requireCsv('Item', 'ko')
const Stain_en = sc.requireCsv('Stain', 'en')
const Stain_de = sc.requireCsv('Stain', 'de')
const Stain_fr = sc.requireCsv('Stain', 'fr')
const Stain_ja = sc.requireCsv('Stain', 'ja')
const Stain_ko = sc.requireCsv('Stain', 'ko')

console.log('Collecting stains...')
const stains = Stain_en.data
  .map(stain => {
    const stainId = stain['#']
    const stain_en = Stain_en.get(stainId)
    const stain_de = Stain_de.get(stainId)
    const stain_fr = Stain_fr.get(stainId)
    const stain_ja = Stain_ja.get(stainId)
    const stain_ko = Stain_ko.get(stainId)
    return {
      id: stainId,
      color: {
        R: stain_en.Color.R,
        G: stain_en.Color.G,
        B: stain_en.Color.B
      },
      name_en: stain_en.Name,
      name_de: stain_de.Name,
      name_fr: stain_fr.Name,
      name_ja: stain_ja.Name,
      name_ko: stain_ko.Name,
      shade: stain_en.Shade,
      shadeIndex: stain_en['<UNKNOWN_2>']
    }
  })
  .reduce((acc, curr) => { acc[curr.id] = curr; return acc }, {})
fs.writeFileSync(path.resolve(__dirname, '../data/stains.json'), JSON.stringify(stains))

console.log('Collecting fruits...')
const fruits = [
  8157, // Xelphatol Apple
  8158, // Doman Plum
  8159, // Mamook Pear
  8160, // Valfruit
  8161, // O'Ghomoro Berries
  8162, // Cieldalaes Pineapple
  8163 // Han Lemon
]
  .map(itemId => {
    const item_en = Item_en.get(itemId)
    const item_de = Item_de.get(itemId)
    const item_fr = Item_fr.get(itemId)
    const item_ja = Item_ja.get(itemId)
    const item_ko = Item_ko.get(itemId)
    return {
      id: itemId,
      icon: +item_en.Icon,
      name_en: item_en.Name,
      name_de: item_de.Name,
      name_fr: item_fr.Name,
      name_ja: item_ja.Name,
      name_ko: item_ko.Name,
      singular_en: item_en.Singular,
      singular_de: item_de.Singular,
      singular_fr: item_fr.Singular,
      singular_ja: item_ja.Singular,
      singular_ko: item_ko.Singular,
      plural_en: item_en.Plural,
      plural_de: item_de.Plural,
      plural_fr: item_fr.Plural,
      plural_ja: item_ja.Plural,
      plural_ko: item_ko.Plural
    }
  })
  .reduce((acc, curr) => { acc[curr.id] = curr; return acc }, {})
fs.writeFileSync(path.resolve(__dirname, '../data/fruits.json'), JSON.stringify(fruits))

console.log('Done!')
