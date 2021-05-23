   
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
 
 
const capitalize = (str) => {
    if(typeof str === 'string') {
        return str.replace(/\b\w/g, c => c.toUpperCase());
    } else {
        return '';
    }
};
 
const a = (x) => {
  return Object.keys(x).map(key => { 
   if (x[key].length !== 0) {  
     return x[key].map(arrayItem => `${key} ${arrayItem}`) 
   } else { 
     return  `${key}`
   }
  }) 
}

 const b = (x) => {
   return [].concat(...x)
 }

const c = (x) => {
   return x.map( (item,index) => { 
    return {key: index, value: index, text: capitalize(item) }}
)}

 
const breedsList = (arr) => {
        return pipe(a,b,c)(arr)
}

export default breedsList;
