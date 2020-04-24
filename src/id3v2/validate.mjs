
import TagError from '../error.mjs'
import BufferView from '../viewer.mjs'

import { timeRegex, year, month, day } from '../utils/date.mjs'
import { includes } from '../utils/objects.mjs'

const stringRegex = /^(.*)$/
const setRegex = /^([0-9]+)(\/[0-9]+)?$/
const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/
const langRegex = /^([a-z]{3}|XXX)$/
const imageRegex = /(image\/[a-z0-9!#$&.+\-^_]+){0,129}/
const syltRegex = /^((\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)|)/

export function textFrame (value, version, strict) {
  if (typeof value !== 'string') {
    throw new TagError(201, 'Value is not a string')
  }

  if (strict && !value.match(stringRegex)) {
    throw new TagError(201, 'Newlines are not allowed')
  }

  return true
}

export function setFrame (value, version, strict) {
  if (version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(set => {
    textFrame(set, version, strict)

    if (typeof set !== 'string' && typeof set !== 'number') {
      throw new TagError(201, 'Value is not a string/number')
    }

    const match = set.match(setRegex)
    if (strict && typeof set === 'string') {
      if (match === null) throw new TagError(201, 'Invalid format (eg. 1/2)')

      const position = parseInt(match[1])
      const total = match[2] ? parseInt(match[2].substr(1)) : null
      if (total !== null && position > total) {
        throw new TagError(201, 'Position is greater then total')
      }
    }
  })

  return true
}

export function timeFrame (value, version, strict) {
  if (version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(time => {
    textFrame(time, version, strict)

    if (version === 3 && strict && !time.match(/^(\d{4})$/)) {
      throw new TagError(201, 'Value is not 4 numeric characters')
    }

    if (version === 4 && strict && !time.match(timeRegex)) {
      throw new TagError(201, 'Time frames must follow ISO 8601')
    }
  })

  return true
}

export function tkeyFrame (value, version, strict) {
  if (version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(tkey => {
    textFrame(tkey, version, strict)

    if (strict && !tkey.match(/^([A-Gb#mo]{1,3})$/)) {
      throw new TagError(201, 'Invalid TKEY Format (eg Cbm)')
    }
  })

  return true
}

export function tlanFrame (value, version, strict) {
  if (version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(tlan => {
    textFrame(tlan, version, strict)

    if (strict && !tlan.match(langRegex)) {
      throw new TagError(201, 'Language must follow ISO 639-2')
    }
  })

  return true
}

export function tsrcFrame (value, version, strict) {
  if (version === 3) value = [value]
  else if (version === 4) value = value.split('\\\\')

  value.forEach(tsrc => {
    textFrame(tsrc, version, strict)

    if (strict && !tsrc.match(/^([A-Z0-9]{12})$/)) {
      throw new TagError(201, 'Invalid ISRC format')
    }
  })

  return true
}

export function urlFrame (value, version, strict) {
  textFrame(value, version, strict)
  if (strict && !value.match(urlRegex)) throw new TagError(201, 'Invalid URL')

  return true
}

export function txxxFrame (values, version, strict) {
  const descriptions = []
  values.forEach(value => {
    textFrame(value.description, version, strict)
    textFrame(value.text, version, strict)

    if (strict && includes(descriptions, value.description)) {
      throw new TagError(201, 'Description should not duplicate')
    } else descriptions.push(value.description)
  })

  return true
}

export function wxxxFrame (values, version, strict) {
  const descriptions = []
  values.forEach(value => {
    textFrame(value.description, version, strict)
    urlFrame(value.url, version, strict)

    if (strict && includes(descriptions, value.description)) {
      throw new TagError(201, 'Description should not duplicate')
    } else descriptions.push(value.description)
  })

  return true
}

export function langDescFrame (values, version, strict) {
  const langDescs = []
  values.forEach(langDesc => {
    textFrame(langDesc.language, version, strict)
    textFrame(langDesc.descriptor, version, strict)

    if (typeof langDesc.text !== 'string') {
      throw new TagError(201, 'Text is not a string')
    }

    if (strict && !langDesc.language.match(langRegex)) {
      throw new TagError(201, 'Language must follow ISO 639-2')
    }

    const checkObj = {
      language: langDesc.language,
      descriptor: langDesc.descriptor
    }

    if (strict && includes(langDescs, checkObj)) {
      throw new TagError(201, 'Language and descriptor should not duplicate')
    } else langDescs.push(checkObj)
  })

  return true
}

export function apicFrame (values, version, strict) {
  const descriptions = []
  values.forEach(apic => {
    textFrame(apic.format, version, strict)
    textFrame(apic.description, version, strict)

    if (typeof apic.type !== 'number') {
      throw new TagError(201, 'Type is not a number')
    }

    if (apic.type > 255 || apic.type < 0) {
      throw new TagError(201, 'Type should be in range of 0 - 255')
    }

    if (!BufferView.isViewable(apic.data)) {
      throw new TagError(201, 'Image data should be viewable')
    }

    if (strict) {
      if (apic.type > 21 || apic.type < 0) {
        throw new TagError(201, 'Type should be in range of 0 - 21')
      }

      if (!apic.format.match(imageRegex)) {
        throw new TagError(201, 'Format should be an image MIME')
      }

      if (apic.description.length > 64) {
        throw new TagError(201, 'Description should not exceed 64')
      }

      if (includes(descriptions, apic.description)) {
        throw new TagError(201, 'Description should not duplicate')
      } else descriptions.push(apic.description)
    }
  })

  return true
}

export function geobFrame (values, version, strict) {
  const descriptions = []
  values.forEach(geob => {
    textFrame(geob.format, version, strict)
    textFrame(geob.filename, version, strict)
    textFrame(geob.description, version, strict)

    if (!BufferView.isViewable(geob.object)) {
      throw new TagError(201, 'Object data should be viewable')
    }

    if (strict && includes(descriptions, geob.description)) {
      throw new TagError(201, 'GEOB description should not duplicate')
    } else descriptions.push(geob.description)
  })

  return true
}

export function ufidFrame (values, version, strict) {
  const ownerIds = []
  values.forEach(ufid => {
    textFrame(ufid.ownerId, version, strict)

    if (!BufferView.isViewable(ufid.id)) {
      throw new TagError(201, 'ID should be viewable')
    }

    if (strict) {
      if (ufid.ownerId === '') {
        throw new TagError(201, 'ownerId should not be blank')
      }

      const idLength = ufid.id.byteLength || ufid.id.length || 0
      if (idLength > 64) {
        throw new TagError(201, 'ID bytelength should not exceed 64 bytes')
      }

      if (includes(ownerIds, ufid.ownerId)) {
        throw new TagError(201, 'ownerId should not duplicate')
      } else ownerIds.push(ufid.ownerId)
    }
  })

  return true
}

export function userFrame (values, version, strict) {
  values.forEach(user => {
    textFrame(user.language, version, strict)

    if (typeof user.text !== 'string') {
      throw new TagError(201, 'Text is not a string')
    }

    if (strict && !user.language.match(langRegex)) {
      throw new TagError(201, 'Language must follow ISO 639-2')
    }
  })

  return true
}

export function owneFrame (value, version, strict) {
  textFrame(value.date, version, strict)
  textFrame(value.seller, version, strict)
  textFrame(value.currencyCode, version, strict)
  textFrame(value.currencyPrice, version, strict)

  if (strict) {
    if (!value.date.match(`${year}${month}${day}`)) {
      throw new TagError(201, 'Date is not valid (format: YYYYMMDD)')
    }

    if (!value.currencyCode.match(/^([A-Z]{3})$/)) {
      throw new TagError(201, 'Currency code is not valid (eg. USD)')
    }

    if (!value.currencyPrice.match(/^(\d*)\.(\d+)$/)) {
      throw new TagError(201, 'Currency price is not valid (eg. 2.00)')
    }
  }

  return true
}

export function privFrame (values, version, strict) {
  const contents = []
  values.forEach(priv => {
    textFrame(priv.ownerId, version, strict)

    if (!BufferView.isViewable(priv.data)) {
      throw new TagError(201, 'Data should be viewable')
    }

    if (strict && includes(contents, priv.data)) {
      throw new TagError(201, 'Data should not duplicate')
    } else contents.push(priv.data)
  })

  return true
}

export function signFrame (values, version, strict) {
  const signs = []
  values.forEach(sign => {
    if (typeof sign.group !== 'number') {
      throw new TagError(201, 'Group ID is not a number')
    }

    if (sign.group < 0 || sign.group > 255) {
      throw new TagError(201, 'Group ID should be in the range of 0 - 255')
    }

    if (!BufferView.isViewable(sign.signature)) {
      throw new TagError(201, 'Signature should be viewable')
    }

    if (strict && includes(signs, sign)) {
      throw new TagError(201, 'SIGN contents should not be identical to others')
    } else signs.push(sign)
  })

  return true
}

export function syltFrame (values, version, strict) {
  const sylts = []
  values.forEach(sylt => {
    textFrame(sylt.language, version, strict)
    textFrame(sylt.descriptor, version, strict)

    if (typeof sylt.lyrics !== 'string') {
      throw new TagError(201, 'Lyrics is not a string')
    }

    if (typeof sylt.type !== 'number') {
      throw new TagError(201, 'Type is not a number')
    } else if (sylt.type > 255 || sylt.type < 0) {
      throw new TagError(201, 'Type should be in range of 0 - 255')
    }

    if (typeof sylt.format !== 'number') {
      throw new TagError(201, 'Format is not a number')
    } else if (sylt.format > 255 || sylt.format < 0) {
      throw new TagError(201, 'Format should be in range of 0 - 255')
    }

    if (strict) {
      if (!sylt.language.match(langRegex)) {
        throw new TagError(201, 'Language must follow ISO 639-2')
      }

      if (sylt.type > 6 || sylt.type < 0) {
        throw new TagError(201, 'Type should be in range of 0 - 6')
      }

      if (sylt.format > 2 || sylt.format < 1) {
        throw new TagError(201, 'Format should be either 1 or 2')
      }

      if (sylt.lyrics.split('\n').every(entry => syltRegex.test(entry))) {
        throw new TagError(201, 'Lyrics must follow this format: [mm:ss.xxx]')
      }

      const checkObj = {
        language: sylt.language,
        descriptor: sylt.descriptor
      }

      if (includes(sylts, checkObj)) {
        throw new TagError(201, '1 SYLT with same language and descriptor only')
      } else sylts.push(checkObj)
    }
  })

  return true
}

export function mcdiFrame (value, version, strict) {
  if (!BufferView.isViewable(value.data)) {
    throw new TagError(201, 'Data should be viewable')
  }

  return true
}

export function sytcFrame (value, version, strict) {
  if (!BufferView.isViewable(value.data)) {
    throw new TagError(201, 'Data should be viewable')
  }

  if (typeof value.format !== 'number') {
    throw new TagError(201, 'Format is not a number')
  } else if (value.format > 255 || value.format < 0) {
    throw new TagError(201, 'Format should be in range of 0 - 255')
  }

  if (strict && (value.format > 2 || value.format < 1)) {
    throw new TagError(201, 'Invalid timestamp')
  }

  return true
}
