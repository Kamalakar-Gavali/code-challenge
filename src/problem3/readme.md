
# ✅ Problem 3 — Issues & Improvements

Below is a well-structured list of issues found in the codebase and how each one was fixed.  
The full **refactored, working code** is available in `Solution.tsx`.

----------

## **1. Missing property in `WalletBalance` interface**

### ❌ Issue

`getPriority(balance.blockchain)` was used, but `blockchain` was **not defined** in the `WalletBalance` interface → caused TypeScript/runtime errors.

### ✅ Fix

Add `blockchain: string` to the interface.

----------

## **2. Incorrect variable used in `filter` callback**

### ❌ Issue

`lhsPriority` was referenced inside the filter function but not defined.

### ✅ Fix

Use the correct variable `balancePriority`.

----------

## **3. Incorrect filter condition**

### ❌ Issue

The filter logic was overly complex and incorrectly structured.

### ✅ Fix

Simplify the condition:

`return balancePriority > -99 && balance.amount > 0;` 

This removes the unnecessary `if` block.

----------

## **4. Sorting logic can be simplified**

### ❌ Issue

Sorting was written with multiple `if` statements.

### ✅ Fix

Use a simpler descending-priority sort:

`return rightPriority - leftPriority;` 

----------

## **5. `prices` included incorrectly in dependency array**

### ❌ Issue

`prices` was unnecessarily included in the sort `useMemo` dependency list.

### ✅ Fix

Remove `prices` from dependencies since sorting does not use it.

----------

## **6. `formattedBalances` not used**

### ❌ Issue

The UI (`rows`) used `sortedBalances.map()` instead of `formattedBalances.map()`.

### ✅ Fix

Update the rows to use:

`formattedBalances.map(...)` 

----------

## **7. Incorrect currency formatting with `toFixed()`**

### ❌ Issue

`balance.amount.toFixed()` did not specify a decimal limit.

### ✅ Fix

Use:

`balance.amount.toFixed(2)` 

This ensures better currency formatting.

----------

## **8. Missing safety check for token price**

### ❌ Issue

`prices[balance.currency]` may be `undefined`, causing `NaN`.

### ✅ Fix

Provide a safe default value of `0`:

`const usdValue = (prices[balance.currency] || 0) * balance.amount;`