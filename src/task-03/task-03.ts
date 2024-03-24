import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  const points = new Array<number>(games.length);

  games.forEach((game, index) => {
    const quantity = [0,0,0];
    game.draws.forEach((draw) => {
      if(draw.red){
        if(draw.red > quantity[0]) quantity[0] = draw.red;
      }
      if(draw.blue){
        if(draw.blue > quantity[1]) quantity[1] = draw.blue;
      }
      if(draw.green){
        if(draw.green > quantity[2]) quantity[2] = draw.green;
      }
    });
    points[index] = quantity[0] * quantity[1] * quantity[2]; 
  });

  return points.reduce((sum, item) => 
    sum + item);
};
