---
title: Managing options and secrets in .NET Core and Docker
date: "2017-03-18"
---

The syntactic sugars are helpful features of C## language. We can use `using(var tmp = new ...()) {}` instead of `Dispose()`, we have common `foreach` instead of `while` loop with iterating enumerator, and we have `await` and `async`. But think a while… do we really need `async` word?

## The world without async

Well, let’s look at the basic example of asynchronous method in C#:

```csharp 
async Task<int> AccessTheWebAsync()  
{
    HttpClient client = new HttpClient();  
    Task<string> getStringTask = client.GetStringAsync("http://msdn.microsoft.com");  
    DoIndependentWork();  
  
    string urlContents = await getStringTask;    
    return urlContents.Length;  
}
```

Await and async are always standing together in your code. The `async` indicates that the method is asynchronous so you can use `await` inside it. So far so good.

But wait! If I can use await only in methods that returns `Task`, `Task<T>` or `void` (for event handlers), why not to assume, that just using await word indicates this asynchronicity.

```csharp
Task<int> AccessTheWebAsync()  
{
    HttpClient client = new HttpClient();  
    Task<string> getStringTask = client.GetStringAsync("http://msdn.microsoft.com");  
    DoIndependentWork();  
  
    string urlContents = await getStringTask;    
    return urlContents.Length;  
}
```

The code above should work, as we have `await` keyword and return type is `Task<int>`. Looks good. This guy is asynchronous. But wait again… what if… Damn!

## Backward compatibility

Imagine, that you wrote code before .NET 4, when `async` and `await` didn’t exist in C#.

You could have write a function like this:

```csharp
public int AddSomeObjects(int await, int bwait)
{
  return bwait + await;
}
```

Looks good, isn’t it? It’s just adding two integers and returns a result. Even if we upgrade .NET to 4.5, the compiler can deduce, that await is an identifier. But consider this case:

```csharp
public object AddSomeObjects(CustomObj await, CustomObj bwait)
{
 return await + bwait;
}

class CustomObj:Task<int>
{
   public int Number {get;set;}

   public static CustomObj operator +(CustomObj o) 
   { 
     o.Numeber = o.Number + 1;
     return new CustomObj (o);  
   }
   
   public static CustomObj operator +(CustomObj o, CustomObj b) 
   { 
     var res = new CustomObj
                   {
                      Number = o.Number + b.Object;
                   }
     return res; 
   }
}
```

This piece of code seems to be valid in older .NET, but if we want to use asychronous programming without `async` keyword, there is a clear ambiguity. In `AddSomeObjects` method old .NET would invoke obviously binary operator which adds `Number` properties of both objects and returns a new object with the new value. However, how should it behave in .NET 4.5? Should it return the same value as in the old .NET or should it wait for a result for `bwait` object with `Number` property incremented by 1?

Essentially that’s the reason why Microsoft introduced `async` – to keep backward compatibility by enforcing implicit declaration that a method invokes asynchronous code.

## `async` as a variable name
I like simple syntax in languages, so I believe that this artificial impediment could be avoided, but being more restrictive on upgrading to C## 5. The simple solution is just forbidding to use await keyword as a variable identifier. Microsoft didn’t do that, so we can have a method like this, which has valid syntax:

```csharp
public static int Test(int await)
{
    return await;
}
```

In my opinion, if someone does so big step as moving to new version of a platform, (s)he’s prepared for some changes. Why not do require so simple one, like renaming identifiers?