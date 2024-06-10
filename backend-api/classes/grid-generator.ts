
import { GridItem } from '../interfaces/grid-item';

export class Grid{

    private static data:{grid:GridItem[], secretCode: number}

    private static biasCharacter:string=''

    public static setBias(character:string){
        this.biasCharacter=character
    }

    public static getGrid() {
        return this.data;
      }

    public static gridGenerator=()=>{
        const chars = "abcdefghijklmnopqrstuvwxyz";
        let grid: GridItem[] = []
        for(let i=0; i<10; i++){
            for(let j = 0; j<10; j++){
                grid.push({
                    column:i,
                    row:j,
                    character:chars.charAt(Math.floor(Math.random() * chars.length))
                })
            }
        }
        if(this.biasCharacter!='' && this.biasCharacter.length==1){
            while(grid.filter((item:GridItem)=>item.character==this.biasCharacter).length<20){
                let arrayWithCharacter = grid.filter((item:GridItem)=>item.character==this.biasCharacter)
                let arrayWithoutCharacter = grid.filter((item:GridItem)=>item.character!=this.biasCharacter)
                let randomPosition = Math.floor(Math.random() * arrayWithoutCharacter.length)
                console.log('rand: ', randomPosition)
                console.log('before: ',arrayWithoutCharacter[randomPosition])
                arrayWithoutCharacter[randomPosition].character=this.biasCharacter
                console.log('after: ',arrayWithoutCharacter[randomPosition])
                arrayWithCharacter.push(arrayWithoutCharacter[randomPosition])
                arrayWithoutCharacter.splice(randomPosition,1)
                grid=[...arrayWithCharacter,...arrayWithoutCharacter]
            }
            console.log(grid)
        }
        const secretCode = this.secretGenerator(grid)
        this.data={grid: grid, secretCode: secretCode}
    
    }
    private static secretGenerator=(grid: GridItem[])=>{
        const seconds = ("0" + new Date().getSeconds()).substring(-2);
        const cellOne = grid.find((gridItem: GridItem)=>{return gridItem.column==Number(seconds.split('')[0]) && gridItem.row==Number(seconds.split('')[1])})
        const cellTwo = grid.find((gridItem: GridItem)=>{return gridItem.column==Number(seconds.split('').reverse()[0]) && gridItem.row==Number(seconds.split('').reverse()[1])})
    
        let cellOneMatches = grid.filter((gridItem: GridItem)=>gridItem.character==cellOne?.character).length
        let cellTwoMatches = grid.filter((gridItem: GridItem)=>gridItem.character==cellTwo?.character).length
    
        if(cellOneMatches>9){
            cellOneMatches = this.adjustCellCount(cellOneMatches)!
        }
        if(cellTwoMatches>9){
            cellTwoMatches = this.adjustCellCount(cellTwoMatches)!
        }
        return Number(""+cellOneMatches+cellTwoMatches)
    }
    
    private static adjustCellCount=(count:number)=>{
        for (let i = 2; i <= 9; i++) {
            if (count % i === 0 ) {
                return count / i;
            }
        }
    }

}
