export async function sortByTime(array : any, key : any) {
    return array.sort(function(a : any, b : any)
    {
     var x = a[key]; var y = b[key];
     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  