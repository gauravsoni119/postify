## Question 1:

> We use JWTs a lot throughout our API. For instance, when a user logs in on our API, a JWT is issued and our web-application uses this token for every request for authentication. Here's an example of such a token:
> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lb25lQGV4YW1wbGUubmV0IiwiYWRtaW4iOmZhbHNlLCJ2YWxpZF91bnRpbCI6IldlZCBEZW
> MgMzEgMjM6NTk6NTkgQ0VTVCAxOTY5In0.4bl2puoaRetNjO1GsweKOnnQsYgwNa9bQIC-WQZkuNo
> Why is it (or isn't it) safe to use this? (hint: the token is one string, the pdf might breaks it into multiple lines)

## Answer:

JSON web token(JWT) are generally secure to use. They are digitally signed using a secure `cryptographic algorithm`(such as [HMAC-SHA256](https://en.wikipedia.org/wiki/HMAC)) with a secret key known only to the server. This signature ensures that the token's content cannot be altered by anyone, as any modification to the token will invalidate the signature. This will make it safer to use.

JWT made up of three parts separated by dot(.):- `header`, `payload` and `signature`. Header contains information about the encryption algorithm. Payload contains claims(sub, iat, exp etc.) that server wants to send. The signature contains data signed with secret. However, it is secure but there are some security concerns that should be taken care:-

1. The token should have strong security key and should be saved securely.
1. The token should not contain any sensitive information such as password, personal information.
1. The token should always transmitted to server over https instead of http. Sending it over http might result into the token hijacking.https://angular.io/api/platform-browser/DomSanitizer
1. The token should have exp(expiration) time after which token becomes invalid.
1. The token will be stored in client-side storage such as local storage or cookies. The care should be taken to secure the storage from XSS attacks.

## Question 2:

> In our web-application, messages sent from one user to another, can contain HTML, which poses some security risks. Describe two attack vectors
> bad actors might try to abuse? And how would you mitigate these vectors?

## Answer:

Allowing user to send HTML in messages for sure associate security risks in our web app. The two common attacks that bad actors might try to abuse are:-

1. **Cross-site scripting(XSS)**: Bad actors can inject malicious scripts into the HTML content of the messages. When the other user view the message, the browser will render the HTML and execute the malicious scripts. This might result in stealing the sensitive information, perform actions on behalf of user.

To mitigate the risk, we can implement the following measures:-

- We can `sanitize` the user generated HTML content. Angular has [built-in mechanism](https://angular.io/api/platform-browser/DomSanitizer) to sanitize the HTML content before rendering. The sanitization process will encode the html and strip out potentially dangerous elements and attributes.
- We can implement a `Content Security Policy(CSP)` that restricts the types of content that can be loaded and executed on your web pages. CSP can help mitigate the impact of XSS attacks by limiting the sources from which scripts can be loaded.

2. **Cross-Site Request Forgery(CSRF)**: Bad actors can prepare a malicious HTML message containing an embedded image or link to an external site. When other user views the message, the browser will render the malicious message and perform actions on behalf of user without user's knowledge or consent.

To mitigate the risk, we can implement the following measures:-

- We can implement CSRF protection mechanisms such as generating and validating unique tokens (e.g., `CSRF tokens`) for each user session and including them in form submissions or AJAX requests.
- We can use the `SameSite` attribute for cookies to restrict their usage to the same site or prevent them from being sent in cross-origin requests.
- We can ensure that sensitive actions (e.g., modifying data, deleting accounts) require explicit user consent through additional `confirmation steps` or re-authentication.

## Question 3:

> Explain the difference between mutable and immutable objects.

- What is an example of an immutable object in JavaScript?
- What are the pros and cons of immutability?
- How can you achieve immutability in your own code?

## Answer:

> Explain the difference between mutable and immutable objects

- Mutable Objects: Mutable objects are objects whose state or value can be modified after they are created. This means you can change their properties, elements, or attributes without creating a new object. Examples of mutable objects include arrays, objects, and classes in JavaScript.
- Immutable Objects: Immutable objects, on the other hand, are objects whose state cannot be changed once they are created. This means you cannot modify their properties, elements, or attributes after instantiation. Instead, if you want to create a modified version of an immutable object, you create a new object with the desired changes. Examples of immutable objects in JavaScript include strings, numbers, and booleans.

> What is an example of an immutable object in JavaScript?
> A common example of an immutable object in JavaScript is a string. Once a string is created, you cannot change its characters individually. Instead, if you want a modified version of the string, you create a new one. For example:

```javascript
const myString = 'Hello';
const modifiedString = myString + ' World'; // Creates a new string "Hello World"
```

> What are the pros and cons of immutability?
> **Pros of immutability**:

- Predictable Behavior: Immutable objects cannot be changed unexpectedly, leading to more predictable code behavior. This will reduce bugs related to unexpected side-effects.
- Functional Programming: Immutability is a core principle in functional programming paradigms. Pure functions are easier to test, reason about, and compose together, which can lead to more maintainable and modular code.
- Optimized Memory Usage: Although creating new objects every time might cause extra memory overhead, in certain scenarios, it can also provide memory optimizations. For example, technique such as `Structural sharing`, used in persistent data structures, enable efficient reuse of unchanged parts, minimizing memory consumption.
- Performance Optimization: In some scenarios, immutability can improve performance. For example, implementing memoization is much easier with immutable data structures.

**Cons of immutability**:

- Memory Overhead: Creating new objects for every change can lead to increased memory usage.
- Complexity: Writing code using immutable patterns may require additional logic or libraries, making the codebase more complex.
- Learning Curve: If you are working in the team, then everyone should be aware of it and have strong understanding of `functional programming`. It can take time for teams to become proficient in working with immutable data structures.
- Performance: In certain scenarios, frequent creation of new objects(especially in case of large data structures) can lead to performance degradation.

> How can you achieve immutability in your own code?
> To achieve immutability in our code, we can follow these practices:

- Use `const`: Declare variables using `const` to ensure they cannot be reassigned. This is particularly useful for primitive values and ensures that their value remains unchanged.
- Use methods that return new objects: Instead of modifying objects in-place, use methods like `map`, `filter`, `concat`, or spread operator (`...`) to create new versions of arrays and objects with desired modifications.
- Use libraries for immutable data structures: Libraries like [Immutable.js](https://immutable-js.com/) or [Immer.js](https://immerjs.github.io/immer/) provide tools to work with immutable data structures and manage updates more efficiently.

## Question 4

> If you would have to speed up the loading of our current web-application, how would you do that? (no need to actually do it, just describe the steps
> you would take)

## Answer

1. **Analyze Performance**: We can use tools like lighthouse or browser devtools to identify the performance issues in the webapp. After analyzing, we can look for opportunity to reduce the size of resources(styles, scripts etc), eliminate render blocking elements and improve the load time.
2. **Optimize Assets**:

- We can optimize our assets by `minifying` our CSS and javascript files to reduce the bundle size. Angular cli do this for us.
- We can use `code splitting` techniques to reduce the initial load time. Angular can handle this out of the box for us.
- We can use `modern image format(WebP)` and `responsive images` with different loading techniques.
- We can `defer` the loading of render blocking styles and scripts.
- We can use [resource prioritization](https://web.dev/prioritize-resources/) techniques to load critical resource first.

3. **CDN and Browser Caching**:

- We can use `CDN` to serve the static assets from the edge locations that are closer to user.
- We can set `cache headers` to enable browser for caching the static assets.

## Question 5

> What part of a new job do you think is more important:

- Choose your own hardware, but work with a company supplied operating system image.
- You’re offered a standard piece of mediocre hardware. Free to pick your own Software.33..

## Answer

I think there is no straight forward answer for this. It will depend upon the project and the team in which you will work.

Let consider the first case. If I can choose my own hardware and company supplied operating system image, this will ensure that I can best of both world.
Consider a case like you are using windows and all team members are using company supplied operation system. If there is some issue comes specific to windows, it will only block you not others. On the other side, if there are more restriction on the operating system, then you might not be able to choose tools of your choice.

For the second case, If I can choose my own software, it might help me to be more productive(since I will choose tools to whom I already familiar). But I think you can always learn new tools and get expertise after some time. However, If the hardware is mediocre and the project require high end configurations, this will definitely impact your performance and productivity(since you don't have any other options).
