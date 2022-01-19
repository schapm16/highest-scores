class ScoreTracker {
  constructor(desiredNumberOfScores) {
    this.uniqueScores = {};
    this._desiredNumberOfScores = desiredNumberOfScores;
    this._numberOfUniqueScores = 0;
    this._currentMinimumScore = 0;
  }

  _updateCurrentMinimumScore() {
    this._currentMinimumScore = Object
      .values(this.uniqueScores)
      .reduce((accMin, current) => {
        return (current.score < accMin)
          ? current.score
          : accMin

      }, Number.MAX_SAFE_INTEGER)
  }

  _updateNumberOfUniqueScores() {
    this._numberOfUniqueScores = Object.keys(this._numberOfUniqueScores).length;
  }

  _updateUniqueScores({ score, jsonData }) {
    this.uniqueScores[score] = {
      score,
      jsonData
    } 
  }

  testScore({ score, jsonData }) {
    if (this._numberOfUniqueScores < this._desiredNumberOfScores) {
      this._updateUniqueScores({ score, jsonData });
      this._numberOfUniqueScores++;

    } else if (this.uniqueScores[score]) {
      this._updateUniqueScores({ score, jsonData });

    } else if (score > this._currentMinimumScore) {
      this._updateUniqueScores({ score, jsonData })
      delete this.uniqueScores[this._currentMinimumScore];

      this._updateCurrentMinimumScore();
    }

    if (this._numberOfUniqueScores === this._desiredNumberOfScores) {
      this._updateCurrentMinimumScore();
    }
  }
}

module.exports = ScoreTracker;