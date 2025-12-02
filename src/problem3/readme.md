# Problem 2 #

Following is explanation of code where is issue and how to improve them refactored working code is in Solution.tsx file

1) 
issue: getPriority(balance.blockchain) was being used but blockchain didn’t exist → caused runtime/TS error
solution: needs to add blockchain: string to WalletBalance Interface
2) 
issue :lhsPriority is not defined inside filter function 
solution : balancePriority variable to be used instead lhsPriority variable
3) 
issue :filter function condion is not correct 
solution : can add condition return balancePriority > -99 && balance.amount > 0; instead of if block
4) 
issue:  sort logic can be simplified for descendesing sort
solution : can add return rightPriority - leftPriority instead of if blocks in sort 
5) 
issue : prices is not not used in sorting
solution : removed prices from sort depedency array
6) 
issue: formattedBalances is not used
solution : in rows use formattedBalances.map() instead sortedBalances.map()
7) 
issue : in formattedBalances balance.amount.toFixed()
solution:  2 can use inside toFixed(2) for better currancy formatting
8) 
issue : in rows map usdValues prices[balance.currency] can be undefined
solution: we can handle this safely by adding 0 as default value
eg:  const usdValue = (prices[balance.currency] || 0) * balance.amount;