export default function generateCombinations(inputs:{value:string}[][],currentCombination:{value:string}[],output:{value:string}[][]){
    if (currentCombination.length === inputs.length) {
      output.push(currentCombination)
      return
    }
    for (let element of inputs[currentCombination.length]) {
      let updatedCombination = [...currentCombination, element]
      generateCombinations(inputs, updatedCombination, output)
    }
  }