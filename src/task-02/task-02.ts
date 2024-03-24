export interface Item {
  id: number;
  name: string;
}

export const uniqueFilter = (array: Item[]): Item[] => {
  const indexes = new Array();
  let isNotDuplicated : boolean;
  const result = array.filter((element) => {
    isNotDuplicated = true;
    for(let i = 0; i < indexes.length; i++){
      if(indexes[i] == element.id){
        isNotDuplicated = false;
      }
    }
    if( isNotDuplicated ) {
      indexes.push(element.id)
    }
    return isNotDuplicated;
  });

  return result;
};
