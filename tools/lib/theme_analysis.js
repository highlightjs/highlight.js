class Badge {
  constructor(name) {
    this.name = name;
  }
}

class ThemeAnalysis {
  constructor(theme) {
    this.name = theme.name;
    this.path = theme.path;
  }

  // TODO: analysis should be better, duh
  get badges() {
    const badges = [];
    if (this.name.match(/Dark/)) {
      badges.push(new Badge("Dark"));
    }
    if (this.name.match(/Light/)) {
      badges.push(new Badge("Light"));
    }
    if (this.name == "Default") {
      badges.push(new Badge("AA"));
      badges.push(new Badge("Light"));
    }
    return badges;
  }
}

module.exports = ThemeAnalysis;
