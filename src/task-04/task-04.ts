import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  // every shape in the index betveen 1 - 3, has the shape that is weak aganist at the left,
  // and the shape it's strong aganist at the right
  const helperArray = [Shape.PAPER, Shape.ROCK, Shape.SCISSORS, Shape.PAPER, Shape.ROCK];
  let result : number = 0;

  const isPlayerVictorious = (enemyShape : Shape, indexChanger : number) => {
    let myShape = Shape.ROCK;
    for( let i = 1; i < 4; i++ ){
      if(enemyShape === helperArray[i]) {
        myShape = helperArray[i + indexChanger];
      }
    }
    return myShape;
  };

  const shapeToPoint = (shape : Shape) => {
    let point : number = 0;
    if(shape == Shape.SCISSORS) point+=3;
    else if(shape == Shape.PAPER) point+=2;
    else point++;
    return point;
  };

  // Game Loop
  for( let i = 0; i < gameSet.length; i++) {
    let game = gameSet[i];
    let myShape : Shape;
    
    if(game.outcome == Outcome.DRAW){
      myShape = game.shape;
      result += 3;
    } else if(game.outcome == Outcome.WIN) {
      myShape = isPlayerVictorious(game.shape, -1);
      result += 6;
    } else {
      myShape = isPlayerVictorious(game.shape, 1);
    }
    result += shapeToPoint(myShape);
  }

  return result;
};
