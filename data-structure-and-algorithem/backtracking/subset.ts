function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  function dfs(start: number, currentSubset: number[]) {
    console.log("start", start, "currentSubset", currentSubset);
    result.push([...currentSubset]); // important: create a copy of currentSubset instead of adding it directly
    // console.log("result", result);

    for (let i = start; i < nums.length; i++) {
      currentSubset.push(nums[i]); // [1]
      dfs(i + 1, currentSubset);
      console.log("popped", currentSubset.pop(), currentSubset);
    }
  }

  dfs(0, []);
  return result;
}

console.log(subsets([1, 2, 3]));
