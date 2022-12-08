const weatherCodeToHuman = (code: number) => {
  if([2].includes(code)) {
    return 'partialyCloudy'
  }
  if([1, 3].includes(code)) {
    return 'cloudy'
  }
  if([45, 48].includes(code)){
    return 'cloudy'
    // return 'fog'
  }
  if([51, 53, 55, 56, 57].includes(code)){
    return 'rain'
    // return 'dizzle'
  }
  if([61, 63, 65	].includes(code)){
    return 'rain'
  }
  if([66, 67].includes(code)){
    return 'snow'
    // return 'freezing rain'
  }
  if([71, 73, 75, 77].includes(code)){
    return 'snow'
  }
  if([80, 81, 82].includes(code)){
    return 'rain'
  }
  if([85, 86].includes(code)){
    return 'snow'
  }
  if([95, 96, 99, 86].includes(code)){
    return 'storm'
  }
  return 'clear'
}

export default weatherCodeToHuman