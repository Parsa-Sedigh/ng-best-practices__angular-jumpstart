/* 1- 00_Course Overview:
- Key architucture and considerations
- Structure features and modules, in a self contained manner that allows teams to develop and deploy features independently.
- Sharing functionality across an app or across multiple apps
- Container/presentation pattern to structure components
- Component communication techniques and crucial role of rxjs subjects
- State managements
- Pipes vs functions and different rxjs operators that can used with HTTP calls

2- 00_Introduction:
3- 01_Prerequisites to Maximize Learning:
4- 02_Key Concepts and Learning Goals:
-Planning our app-communication throughout the application
-How do you structure your project?
-How do you do your folders? You've probably heard of feature-based and we'll kind of stick to that approach, but as the app
-gets bigger, there are some decisions that need to be made and we'll talk about some of them.
-Best practices that you can find in style guide
-RXJS concepts
-state management
-structuring our modules
-organizing our components within these modules, so we can maximize reuse and shareability and just make it easy to maintain.
-Custom libraries- At some point you may say: Hey I want to share this component, but I want to share it across many apps, NOT JUST
ONE APP. We'll talk about some angular cli features that will help you with that task.
-component communication techniques. In there, we have the normal stuff like @Input() and @Output() props, but what happens when it's
a little bit more involved than just that. Where we need to communicate between many levels of an app? How do we do that?
-Rxjs, subjects that are very useful, actually with communication.
-Managing state
-Custom decorators, pipes and the role they can play for performance and HTTP and ...

5- 03_Sample Application and Software Requirements
Angular jumpstart repo is a demo app and has got a nodejs backend.

6- 04_Course Overview:
-Planning the blueprint(planning the app architucture)
-techniques for organizing features and modules
-structuring components and different techniques that can be used there as you work with, for instance a parent and a child or maybe
a great-grandparent component and a great-grandchild or sth along them.
-component communication(@input()s and @output()s)
-various state management techniques and we will introduce more complex solutions to very simple solutions.
-additional considerations like functions vs pipes, custom decorators and how rxjs and httpClient can be used together to increase
performance and make more efficient calls to the server.

7-00_Introduction.1:
Planning the app architecture:
Let's look at some architecture considerations BEFORE starting building our app.

8-01_Architecture Considerations:
Every application regardless if it's frontend or backend should think about it:
1) App overview: You need an app overview, what is the application for, what are the goals, how the client is going to use it,
what are the business benefits and strategic benefits?

2) App features: Depending on if you're waterfall approach, or agile, or a mix of them, you may not know every feature of app, up front,
but you should know some of them. So let's list those app features here and the reason for that is now we can start talking about
specifics.
3) Domain security: What is the domain security? Are we using rules on the server side, groups, claims? How are those gonna to be
communicated down to our angular app? How's the angular app gonna communicate with our APIs? Is it going to use token based, an
LDAP server with active directory?
In some apps, there might a lot of security involved where you need to plan for them up front.
4) Domain rules: What domain rules do you have? Are the rules gonna run client side strictly or are you going to run them again on the
server? Now in most cases, you want to run them in both places, especially things like validation. But you might have some really heavy
number crunching rules that take a lof of time to run, that might require an API call and those might run on the server.
5) Logging: What are we doing when an error is encountered in our frontend app? Are we just writing it to the console? No not good!
Are we writing it maybe to local storage? Or are we actually going to create an api or maybe integrate with a cloud option or a
third party option that provides excellent logging capabilities. Now if you work with a help desk and get help desk support tickets
that you have to support, or your production support team supports, having good logs is essential. Because there's nothing worse than
what we call: "the needle in the haystack ticket" and that's where you're given a ticket, there's very little details on the bug, but
the client says there's a problem but you have no idea to go look for that.

6) Services/communication: How's the angular app going to talk to the server? Maybe you say: It's gonna be HTTP! and experts argue and
say: In most apps that's probably true, you'll use HTTP concepts, of course over HTTPS. However, your app might have some real time data
considerations and websockets might be more appropriate. So HTTP? WebSockets? So that's good to know up front. Because that's gonna change
some of the architecture on how data is exchanged between not only the backend and the frontend, but even between services and
components in your frontend angular app. So it's crucial to talk through what we're going to do there and what are we going to create
as far as services go(as far as services concern), or later we'll talk about state management techniques that might also use this(http or
websockets?).

How are we talking to the server?
HTTP?
Angular app ------------------> server
Web sockets?

7) Data models: What's the data from the API down to angular, from a given service let's say in angular? What are we passing to components?
Are we getting what we want from the API? Is it exactly what we want? In many cases we can say, NO! A lot of times APIs are reusable,
they give you back a CHUNK of data and then you ONLY need a SUBSET of that. So we should plan for WHAT'S THE MOST EFFICIENT way TO
get data passed around throughout the app.
Now you may not know everything about your data models up front, that's ok. This is more an exercise in discussing what are we going to
pass? How it's going to be passed? Are we going to create view models(Learn: models that just have the data that the component needs)?
Or use some other techniques?

What model data are we expecting?
server--------> API  ----> ...
<--
-->

8) Feature components: What are our feature components and how are we going to structure our components? We would talk about different
techniques such as the presentation container pattern, but there might be some other things you need to do and this also gets into
communication between components. If 2 features can be alive at the same time in the app and they need to communicate, how are they
going to do that in a loosely coupled way? and we'll talk about some communication techniques that we can apply here as well.

9) Shared functionality: What shared functionality do we have? Are we using third-party components? and if so, there's a lot of
options out there, which ones? Are we just going to use them natively and directly? Are we going to write some wrapper components
around the shared components, so that we can actually swap out those third-party components if we wanted down the road? Also, is the
shared functionality just sharable in this one app or could it be reusable across many of your apps at work? Now we need to talking
about libraries there.

So you must think through some of these critical aspects up front. Now how we do organize all this info?*/
/* 10-02_Architecture Planning Template:
We need 1 slide for each of those 9 things that we mentioned.

11-03_Architecture Planning Template Example - Part1:
-1 App overview:
-overall goals
-Support viewing and editing customers
-Support viewing orders
-Secure customer edit form(provide a secure way to edit customers in a form)
-Key requirements
-Display customers with card/grid option
-Support filtering, sorting and paging(server side paging) customers
-Map customers(google maps)
-Customer editing support(CRUD)
-Display orders with paging
-Support login/logout with email/password(that could change to a more of a token based authentication)

-2 App features:
We need a way to work with customers and individual customers, so that also would be a separate feature and ... .
-Customers feature:
-display customers
-support card/grid modes
-display customers on amp
-support filtering, paging and sorting
-Customer feature:
-create/update/delete customer entity
-display customer details/orders/map
-form provides validation
-orders feature:
-display orders
-support paging
-login/logout feature

-3 Domain security:
Domain security is pretty easy on this project and it's just email/password for login and we're not gonna focus on that a whole lot,
because normally the backend will be very variable depending on your company and how you do things. But we're going to assume that
maybe we're going to consider tokens for a future release.
-email/password for initial release
-consider tokens for future release?:
-HttpInterceptor could be used to set auth header
-what option will be used for token issuer(what is the backend that issue those tokens)?

-4 Domain rules:
-each order must be associated with a customer
-order totals should be shown for a given customer(so we need to convert and calculate sum of orders into an order total for each
customer and with that we assume that the server doesn't give us, so we need to do it in frontend and that'd be a rule we'll have to
incorporate)
-customer edit form should validate data entry
-user must login to access customer edit form(so we need a route guard to secure that route at least on the client side)
-validate login credentials(so we need to validate email and password against the server and do some front-end validation as well)

-5 Logging:
For this one, we're gonna have a logging service which for development maybe just writes to console.log(), but we're gonna assume that
maybe the client would ultimately like to use Azure AppInsights or some other third-party or cloud service to actually log our
our errors that occur on the frontend. This is one of the most crucial areas when it comes to satisfying and kind of answering the
help desk tickets and getting those resolved.
-create an angular service for logging
-consider using azure AppInsights
-wrap existing AppInsights client SDK
-handle logging to different areas based on dev/stage/prod
-console logger
-AppInsights logger

-6 Services/communication:
We're going to assume we've been told is just a standard RESTful service on the backend and we're going to use nodejs.
Then as far as angular services(we have a service on backend which is a restful service, also we have some services in frontend which
are angular services), we need a way to get customers and orders and we need a way for the user to be able to login and logout by
authenticating against the server of course, so we're gonna need some services for that. Also we need a service for sorting, therefore
rather than putting all the sorting inside of a component, we're gonna put that in a service and same for filtering and we already
mentioned the logger and then we might even need to communicate in different ways between different levels of our app, between different
levels component levels(component communication), so we need to plan for that too, up front.
Now earlier I mentioned that for now we're just going to use email and password for security to log users in and then that would just
set an encrypted ticket in a cookie, but we might end up using sth else, we might use a token with OAuth for example and in that case(tokens)
we might have an HttpInterceptor that might interact with the request and responses to do different checks or to set headers.
When it comes to RESTful services, are we just gonna do GET and POST? It's too simplistic right?
We always at a minimum do GET, PUT, POST and DELETE, but another crucial one that not much people dive into it is PATCH.
Learn: PUT is typically when you want to update the WHOLE object, but a lot of us have forms that they're not just the whole object,
they're PART OF AN OBJECT and then ultimately we want to kind of overlay the data from the form over the object that might be in our
data source and that's a perfect example of PATCH. PATCH is for when we want to patch or change one or two(some of props but not all of
them) properties, it could be more of one or two.
So that's another discussion point that is crucial to have(choose PUT or PATCH).

REST verb examples:
VERB     URI                         ACTION
GET      /customers           select multiple records
GET      /customers/101       select a single record
POST     /customers           insert a record
PUT      /customers/101       update a record
PATCH    /customers/101       update SPECIFIC properties(not all of them!)
DELETE   /customers/101       delete a record

-Restful service will be used(node.js)
-angular services
-data services: use HttpClient
-customers/orders
-login/logout(auth)
-sorting service
-filtering service
-logger service
-mediator/eventBus if needed
-HttpInterceptor will set token for http requests if token used(GET/PUT/POST/DELETE/PATCH)*/
/* 12-04_Architecture Planning Template Example - Part2:
About data models in this app, we just have customers and orders, but we're not going to editing the orders(users can't edit
orders). So we're going to focus mostly on a customer model, also of course we would need sth for authentication(send those credentials).
But what we're going to do with orders? Are we going to have a separate one? Or are we going to include that(order model) with the
customer(customer model)?
Also are we going to create a class for the models that we ultimately get back from the server and then we'd have to write some
code to fill those models? Or are we just going to use an interface?
Learn: The benefit of an interface is that there will be zero impact on the bundle size for production, because of course TS compiles
that interface out, so we opt to go for interfaces unless our classes are more specialized. Now if you say: Hey, my model is not
just properties, but it also maybe has some functions(methods) in it which would do sth for the given model, then yes, a class absolutely
appropriate. But if you're literally just exchanging the data from the server and using that for the most part, or maybe scaling that
object back to a smaller object, you can get away by just using an interface. So there's really no need to build that class, if you're
really only using it for intellisense and code help and an interface would work great there.
A general rule is always opt for interfaces, if you can!
If you use classes for data models, that means you have to map that data coming from the server, into that object ultimately.

-7 Data models:
-application models/interfaces
-customer model/interface
-auth model/interface
-no order editing so include with customer?
-create a class or just use an interface on the client side?

Customer model:
Customer:
id number
firstName string
lastName string
...
orders Order[]

-8 Feature components:
What are our main feature components? This will help us start to spec out or scaffold out with the angular cli, our various feature
components. So we know that we have to display customers, so that would be a feature component. We know we have to work with an
individual customer, so ... .
So this is a good oppurtinity to start thinking about the top-level feature components. Now you notice we're not going deeper into how
we're going to organize any children that we have. We'll be talking about them later, as we talk about structuring components. But
if you want, you can go deeper.
customers
display them, filter them, sort, page customers (need data service)
customer
create, read, update, delete customer (need data service and model needed for deletes)
orders
display, page orders
login
login form and logout functionality(need auth service)

component UI layout:
Here's an example of what we might end up doing:

Customers(in this diagram we talk about this one) | Orders | Login  (loads immediately)-                                                                been given maybe by a business analyst. )
---------------------------------------------------------
Customers
-----------------------------------------------------    (lazy load feature?)
Toolbar
------------------------
display cards and/or grid

load immediately means it would load immediately when the app loads but then we're considering lazy loading the stuff below it which are
customers feature and that feature might have a toolbar potentially and we're going to display cards or a grid we're being told
from the docs we've been told.

-9 Shared functionality:
-toast/growl(success/information)
-modal dialog
-google maps
-pager
-menu
-grid/card(used more than once?)

Now we need to start making some decisions here, which is are these mentioned functionalities, truly shared? Or they just used
ny one feature?
That question would determine where you put those components(YES! THEY ARE COMPONENTS!) in your overall folder hierarchy.
Also are any of those going to be reused across apps?
If so, we would have a shared library.

-10 Shared functionality(3rd party):
Maybe for a calendar or autocomplete that you don't really want to write them. So those calendars and ... are like widgets.
-are we going to use any 3rd part components? research a few options such as:
-prime ng
-ng bootstrap
-angular material
-ag-grid

So that was an example of using the template. */
/* 13-05_The Angular Style Guide:

14-06_Other Considerations:
1) accessibility: Maybe this also effects the architecture of your app, because there might be sth specific you're doing to meet
some of the WCAG guidelines out there.

2) i18n(internationalization): With considering this, now you should have a way to load your different language resources and make sure
they're getting in your components correctly and ... .

3) environments: As you move the code between the environments, how are we going to do that? That could get us into CI/CD.

4) CI/CD:

5)CDN, container, server: How are we actually deploying the code to production? For doing that, are we going to move to a CDN(content
delivery network)? Are we going to use containers and maybe docker? Or we just deploying to a server?

6) unit testing: Are we gonna use the built-in cli tools? Which in there, we can use the karma test runner or ... .

7) end to end testing: Are we using protractor or cypress? cypress is better! Because that might influence your code too, because
your end-to-end testers, if there's another team doing that, they may prefer to have IDs on some or maybe all of your tags to make
them easier to find for test, that depends on group and how they like to work.

8) APIs: The backend is where TRUE security and data validation happens.

9) and ...

15-07_Summary:
- Take time to discuss and document key architecture concepts
- Create a simple architecture template that can be reused across projects
- Create your own style guide that's based on the official angular style guide */

/* 16-00_Introduction.2:
Organizing features and modules:
overview:
- how we can organize features and some general techniques
- feature modules: how we organize modules and features?
- core and shared modules: These folders are directly recommended by style guide, but you can certainly rename them if you want.
But what we use those folders for and what we put in those folders?
- creating a custom library: You might have some shared widgets and those shared widgets might be shareable across multiple apps throughout
your company.
- consuming a custom library: and even publish that library to npm or maybe a local private npm that you might have within your company.

17-01_organizing features:
LIFT:
- L: locate code quickly
- I: identify the code at a glance(how we name our files- remember: route guards OFTEN have the name .guard in them)
- F: keep the flattest structure you can
- T: try to be dry: Things like angular services help us a lot in this thing.

There's 2 ways we can organize code:
If you used MVC pattern, is convention based and it plays a huge rule even in angular potentially. But when it comes to organizing your
code and specifically your features, it's not good to use that approach and style guide is also agree with that. So don't create or
have a folder called components where you just dump all your components in that folder and a folder called services where you dump
all your services.
So we use feature based. But convention based MIGHT actually plays a small role there too. For example you might have a feature folder
called customers and then under that folder, maybe you have a ton of components which are children of that feature. Like: +customers
+edit
+grid
+cards
Well, if you have too MANY of too many of those, then you could certainly make a subfolder(under the feature folder) called components and
put them in there. Like: +customers
+components
+edit
+grid
+cards
But doing that is optional. By doing that, it adds one layer of nesting when it comes to our ES2015 import statements.

The downside of convention-based is it typically results in a lot of files in a single folder, such as components or services folder.

Angular CLI by default do things based on feature-based archituctere. Features are all organized into their own folder, they're all
self-contained and that thing(self-contained) plays a role with routing and modules and ... and everything is very easy to find for that
given feature.
convention-based                                         feature-based
- follow strict naming conventions                    - features are organized into their own folder
- related code maybe separated                        - features are self contained
- can result in a lot of files in a folder            - easy to find everything related to a feature
in larger apps

Organizing features:
So first we used a feature-based approach, second use the angular cli, yeah sure it has a way of flatten out structures and not make
subfolders if you want, but by default, especially for your top-level features, you could just use the CLI.
Now from there we gonna use modules, but it's good to have a minimum of one module per feature(in general, one module per feature)
and that's gonna set us up for lazy loading and also sets your feature up to be self contained. So that feature module just can be import,
for instance the root module or some other feature module, IF NEEDED.

Also you need to avoid deeply nested folders and you need a flatten feature hierarchies.

Recap:
- use a feature-based approach to structure your code
- use the angular CLI to generate initial feature folder/component
- minimum of one module per feature(as appropriate)
- avoid deeply nested folders
- flatten feature hierarchies

EX) The hierarchy structure:
bad:                            good:
-app                            -app
-core                           -core
-course                           -exercise
-course-overview                -items
-lab                            -lab
-exercise                     -shared
-exercise-step              app.module
-items

So flatten out your TOP level features and if you have nested FEATURES(yeah nested FEATURES not components-because components are
kinda always nested), be careful how much deep you go.*/
/* 18-02_feature modules:
Let's assume we have a customers and orders feature. So first we do ng g c customers and that would add the customers sub-folder at the
top level. This is where people kinda stop and they end up adding features more and more to the root module and while there's nothing
wrong with that, as the app grows and you get more features, you still have just one module. Therefore you can't use lazy loading and
the feature is no longer self-contained. So if that feature gets more complex into the future based on, maybe change requests, then we would
have challenge, because now, whoever owns the root module on the team, kind of needs to know about that feature as well and that's
really now how it should be. So we mentioned at a minimum, we have one module per feature, but often we have 2, because a feature often
has routing and therefore we have our feature routes defined within a module, in the feature itself. So in this case it would be
customers-routing.module and then of course that module would be imported into the module for that feature which is customers.module .

Now you may have other modules as well, if you have more complex sub-features of that feature. Why?
Because you might actually want those sub-features to be self-contained. Or maybe a portion of your team is working on those sub-features and
whoever owns the root customers.module , maybe you don't want them(whoever owns the customers.module) knowing about all the sub-features.
So you want to keep it separate as possible.

Feature modules
customers
feature-routing.module(this must imported in
|              feature.module)
|
feature.module

By having self contained features, we can now have different members of a team, work on then given feature and pretty much own that
feature. This means, they're in charge of routing and they're in charge of any services needed by that module.

Now if I was the team lead and let's say my job is to import the customers module into the root module(app.module), then I no longer
have to know any details about that feature or it's sub-features. But the exception is if we lazy load the module, in that case, we
have to define the route, if I owned the root module. But aside from that, any child routes or sub-modules that are in the customers module,
I wouldn't know about them.

Learn: Now if you look at the about folder in the app, you see it's have it's own routing(routing-module). Now that one happens to be
lazy loaded, WHICH IS WHY THE PATH IS EMPTY.
Now in the routing-module, you notice we have already imported the components of that module(in this case, AboutComponent) for our different
routes, so oftentimes we add a static prop in class of that routing-module which we called it components which is an array and with that,
in the feature.module, we can say: declarations: [<routing module of that feature module>.components] and with that, we no longer have
to re-import all the components in that feature module and oftentimes even there's child routes, we'll have those components in the
routing-module of course! So we just add them to the components prop in that routing-module and then we use that prop in the declarations
array of feature module.
Important: Now that about module is lazy loaded, but if it wasn't we would then have to import that module into our root.module , but
 currently you see that AboutModule isn't in the root.module and that's because it's going to be lazy loaded and therefore you notice
 we have the path of our lazy load module in the root routing module and then loadChildren prop there and ... .
So if you have module for the feature, you can lazy load that module.

19-03_core and shared modules:
So we saw that at a minimum we'll normally have one feature module per feature, but we can have multiple modules for a feature,
specially once we add in routing and maybe some larger sub-features(so those sub-features can also have a module or multiple modules).

Now let's go to more of the reusable code(DRY code), so core and shared modules.

Core module:
-Core is designed for your singleton type of services. Anything that would be shared throughout the app and obviously any singleton, would
 be good for that. But core isn't only for singleton services.
-Services that are specific to a feature, for instance maybe we have an order service and the orders feature is the only one that's going
 to use that order service. In that case, we would make a sub-folder in where the feature lives and call it services and put that
 service in our feature and in that sub-folder and that particular service would just be imported or provided directly into the
 feature module. Now that makes a lot of sense to do, if that particular service is not going to be reused or injected elsewhere throughout
 your app. So there's nothing wrong with putting services in a given feature.

You might have some type of a data service for maybe customers and one specific to orders and ... .
The name of that module can be core or common or ... .
Recap for core module:
-core folder should contain singleton services which those services are shared throughout your app
-services that are specific to a feature can go in that feature's folder
-example: LoggingService, ErrorService, DataService

Shared module:
Now when it comes to shared functionality, that's your shared module. Our reusable components, reusable pipes and reusable directives going
there. For example if you wrote any custom grid and maybe that's reused throughout your app which can go in that shared folder.

The distinguishing factor between core and shared modules is will the widget(components, pipes and directives are like widgets) only
be used in this app or could it be used across apps? So is it SOOO GENERIC that you could reuse it over and over across apps?
If yes, don't put it in shared folder and that GENERIC widget is when we want to talk about creating an angular library.

Recap of shared module(reusable components, pipes, directives):
-shared folder should contain reusable components, directives and pipes
-example: CalendarComponent, AutoCompleteComponent

When it comes to working with these modules, shared module would normally be imported potentially multiple times. So it might be
imported into the root, because maybe the root component need sth in that shared module. Or it might be imported into the customers
feature module or any other feature. So shared module would be imported many times.
But the core module, should only be imported ONCE and that would happen into the root or app.module .

EX)
CoreModule  -> RootModule

SharedModule -> RootModule
             -> FeatureModule1
             -> FeatureModule2*/
/* 20-04_core and shared in action: TODO missing

21-05_creating a custom library: (When doing your initial planning), you may determine that one of your shared items, needs to be
shared across multiple apps. You may want to put it in npm, or maybe in an internal npm that your company use. Currently it's simple because
of a feature of ng CLI.

1- Create a new project: ng new <name of project-not name of library>
2- cd into the root of the created project
3- ng generate(or g) library <name of library> (this would scaffold out an entierly new project which is the library project and make a new
folder called projects.)
The command 3, adds a separate project into what's called a workspace. When you do ng new <name> you get a workspace with one project in it,
which is your angular project and this ng generate library adds a second workspace into that current workspace, so we can test our
library in the angular app without publishing to npm. Now what this does is it's going to modify a ts.config file and that's going to
be updated so angular project(the separate one in the workspace), understands how to get to the shared library that we're building.
Also the command3, updates tsconfig of the early created project(which we created it with ng new <name of project>) and in that updated
tsconfig.json , it added the "paths" which is the paths to where ultimately we're going to building our dist folder once we do a build
command and that's why you have to build first, before you can do this, because TS is actually going to look at that dist folder(actually at
<"name of library>/*") to make that work.
Another update is now angular.json now has a new project in it which is specified with the name of library. So we have our workspace up
top of that file, which is "projects" and in that, first we have the name of angular project itself, but with the command3, it added a
secondary project which is specified with name of library, so "<name of library>" and in root prop of that object, it specified the path
to root of that project(library project in this case). So those were the main things which that command added.
Then what you can do is build your library using:
ng build <name of library>
and after that, you can use it and test it, directly in the other angular project which is within your workspace.
Now once we've tested it out, we want to publish it to npm. Because we want to be able to pull in from npm, whether it's the npm
which is out there and anybody can get access to it or if it's internal npm, we want to get it.

Publishing a custom library:
1) build your library for production
2) publish to npm or to an internal npm

So first we build our library then cd into dist folder and there will be a package.json and that's gonna be used to publish up to npm.

Now if you want to test your library before publishing to npm, you can go to your angular project(which is on top of the library
project and for example use the components you created in the library project, there.). So actually we want to consume our library.

22-06_consuming a custom library:
For consuming, we need to import our shared library module. So go to imports array of app.module (or any other) and add it there.
Now when you import the library module, in the import statement, you see .../public_api . So what they've done is they created a barrel and
which is the public_api.ts file and inside of that they're exporting what's inside of our library and you can change that too!

BUT!!! While that import statement works, we don't want to have to constantly change the path for importing our library, especially
once we publish our package to npm. So instead of importing sth from our library by for example saying:
EX) (angular main project)app.module.ts:
import {AcmeSharedModule} from 'projects/acme-shared/src/public_api';

We can just use the name of our package which ultimately will be for example 'acme-shared' and put it in import statement. What they're
doing is little magic behind the scenes to make it to work, so it knows how to get those exports of barrel file I mentioned.
Now if you go back and if the error doesn't go away, you can put a space and then backspace, the angular language service updates. Now
we have no error when using the component of our library in angular project.

Now if you try to see the results or actually serve the current angular project(not the library project), you would get an error. Because
there's no dist folder yet for our shared library(because currently the shared library is used in the angular project).
So before serving and building the angular project, we need to build our library itself first. So from the root of overall project,
write: ng build <name of library project> --watch(this flag is optional) and if you see the dist folder which is in the overall project,
inside of it, you see the folder name of your library project, because we didn't do an ng build on our core(angular project and not library
project) and in library folder build inside dist folder, there's a package.json and in there, there's the name of project(our library) that
would be published and the version that we're CURRENTLY publishing and you can also add some other props like who is the author and ... .

After that you can serve your overall project(includes both angular project and library project), now you see your library component or ...
works OK.

Now for publishing to npm, first you need to cd to that library folder in the dist folder and then run:
npm publish and that doesn't matter whether we want to publish to public npm or our company's npm.

So when you're planning on your project, if you have some widgets that gonna use by many of our apps, make a plan for creating a
library for them rather than putting them in the shared folder of the app and then having to copy and paste them between those apps.
But with creating a library for them, we just do a npm install of our custom shared package and we're ready to use it in that project.*/
/* 23-07_putting all modules together:
Now we're talked about different type of modules including feature, core, shared and library modules let's recap.

On the left, we have the main things we're concerned about, we have some widgets in the app, so things like menus, calendars or
autocomplete.
Routed components are the components that are associated with a route.
-Now where would widgets go?
 The answer is it really depends. But you probably say: They must go to shared module and that would be a correct answer in many cases.
 BUT! if a given widget is only used by ONE feature, then instead of bring them to shared module, we would probably import that widget
 directly into that feature(so we import it to feature module of that feature we want to use that widget in).

-About feature and child components, if it's a feature component, it's going to go into the feature module. If it's a child component for a
 given feature, of course it'll go to that feature module as well.

-What about services?
 If the given service is reusable, then we put it to our core module. But if that service is only used by one of the feature modules,
 we'll probably want to move that service into that particular feature module area.

-About the routed components which typically would be, for instance, your features. We're gonna define the path that routes(in other words,
 the path which point towards) to that given component in a routing module and often that routing-module will be part of the feature module
 and imported into that feature module.

-About pipes, where would those be used?
 We can put them in shared module and that would be the most logical place, but if you did have a scenario where a given feature is using
 a pipe and it's the ONLY feature that needs it, you might actually import that pipe into that feature module.

Now when it comes to exporting, which of those widgets, pipes, services and ... would we probably export from their module(s)?
A feature normally is a standalone and it'll just be imported into the root module and the root module doesn't really have to know
anything about it. So we probably won't export many things(if ever), out of a feature module. About exporting stuff from RoutingModule,
typically we will import our routing functionality and then export that and that's it.
About core module, we know the core module is only going to imported into our RootModule(app.module), so core probably won't have
really any exports.(Remember: The module itself doesn't need to export itself! Because we can use the other modules into a module, without
exporting those other modules from their files! That's nonesense to export the modules and specify their files into that exports array!
We just specify the widgets and ... in exports array of a module and not the module itself! So that's why I said the core module really has
no exports, but with an exception.)
The exception for exports of core module, would be if you put single-use components such as a menu which should be used ONCE, in the
entire app, into the core module. Now if you have sth like that in the core module, you of course have to export that particular component
(because in one place we're using it, so we need to export that thing) and any others that are single-use COMPONENTS in core.
Finally about shared, it's the one that almost always will have some exports, because otherwise, it wouldn't be shareable. So if we imported
SharedModule into a FeatureModule and we didn't export anything from that SharedModule, then of course we couldn't get the stuff from
SharedModule in that FeatureModule. So SharedModule will be your main thing that's gonna have exports. But is it possible that a
FeatureModule to have some exports? Absolutely. You may have a feature that's kind of a sub-feature and that's gonna be self-responsible,
exporting what it needs to and then maybe that sub-featureModule is imported into the FeatureModule itself(because maybe the sub-feature
is used into that feature, so the module of that feature needs to know about the sub-feature so we need to import it).

Organizing functionality:
widget                                            FeatureModule
feature/child component                                ^
service                                                |
routed component                                  RoutingModule(goes into FeatureModule)
pipes                                             CoreModule
                                                  SharedModule

Organizing application modules:
So for putting all modules together, we'll have our RootModule. We know we're gonna have CoreModule for our singleton-type objects.
We're gonna have our SharedModule(shared funtionality across one aoo-for across multiple apps, we create a library for those stuff).
Also we have our FeatureModules(like CustomersModule) and a FeatureModule will typically have it's own RoutingModule. That way, that
FeatureModule is self-contained and also any child components of that feature and potentially any child modules(especially in a larger
feature), would also imported in that FeatureModule.

Then we might have another FeatureModule like OrdersModule and it would have it's own RoutingModule.

The shared libraries would need to be imported into the project through an npm install and oftentimes they'll be imported into the
SharedModule. BUT! it may be that a shared library feature is ONLY used by a given feature like CustomersModule. In that case, we ONLY
import it in that module and not SharedModule.

                                  RootModule

                  CustomersModule    |   CoreModule   |     OrdersModule
                    RoutingModule    |                |       RoutingModule
                                          SharedModule
                                              ^
                                              |
                                          SharedLibrary
*/
/* 24-08_summary:
-Use a feature-based approach over convention-based. But you may still use a convention-based, maybe for some of the child components,
 which child components are components within a feature, but it's definitely to use a feature-based approach for our top-level and for
 child components themselves. Now how you organize as you get deeper is up to you. However, do sth that's not too deeply nested and
 keep things as flat as possible.

-Take time to plan feature modules: So take time to plan your features and modules in that features. If we do, we can leverage lazy loading
 down the road and we can different members of a team, own that feature and that's because the feature would be self-responsible or
 self-contained. So don't put everything in the root module.

-One module per feature(as appropriate): Normally we have 2 modules per feature, because we'll have our routing-module and that will be
 loaded into it's corresponding FeatureModule and then of course the FeatureModule either gets lazy loaded or is loaded into the root
 module(eagerly).

-Use core and shared modules: The core module typically is for services, but I mentioned we can even put our single-use components in that
 folder(area) and module. You can also rename core to sth else.
 Any of your pipes, directives, things that'll be reused throughout the app many times potentially, they should go into shared module.

-Use the angular CLI to create custom libraries as needed. */
/* 25-00_introduction3:
Structuring components:
Module overview:
-Container and presentation components: A pattern called container presentation and this is a way to structure your components in cases
 where you have a lot of functionality and you need to keep it clean and maintainable.

-Passing state with input and output props: So for passing states between components.

-Change detection strategies: So we talk about change detection strategies that child or presentation components can have.

-ngOnChanges: Actually reference vs value types, as you're passing data and wanting to intercept when changes occur in a child component using
 ngOnChanges and there would some challenges there and that's gonna relate to cloning of our data.

-Cloning techniques:

-Component inheritance: This is sth that on occasion COULD be appropriate(it's lesser used feature).

26-01_container and presentation components:
How big do you make your components? Do you make one component that has everything in it that represents the entire page?
Do you add child components? Do you do a mix of that?
We do a mix of that.

When you start, you have your feature component and it grow and grow. So then we break it down and we make a more complex component that
would have some child components. Now if you want to be a little more formal on naming this second type of complex component, we can
call it a container presentation component IF you do a few things. I talk about them after this diagram:

Structuring components:

       simple component                  complex component(this can be container component and it's children components can be presentation
                                                            component if some stuff are true.)

        HTML template             child component  child component

container and presentation components:
First off, if that container is 100% responsible for managing the state. In other words, it interacts with a service or some type of a
store, in order to get the data, it's the boss, it's the manager and if you then pass that data down to the children which we're gonna
call them presentational components, then this is the container-presentation pattern.

          container component(this component, manage state(interact with service/store). So this is the boss.)
         /                 \
        /                   \
presentation component   presentation component(this kinds of components, present state in the UI.)

        container component retreives state
     presentation component presents/renders state

Container communicates with services:
What that patter says is, let's get the data from one starting point, which the component do that work is our container and it's responsible
for retrieving the state. Let's then hand that data down to our child components and they're gonna be responsible 100% for presenting the
data. But that's it. Those children don't know how to get the data, they don't know how to interact with the store, they're just
presentational components. It's good to follow this pattern, especially when you have more complex components that you want to divide it
up.

Diagrams:

service-store or... <-------> container component(pass data down to children)
                            /                                       \
                            /                                        \
                     presentation component(child)  presentation component(child)

Without a container component:

service or ... <-> container(parent component)
                    /                   \
                   /                     \
service ... <-> child comp              child comp  <-> service

So without a container comp, that's hard to know where that data comes from?
Important: So the general idea is the container always gets the data, it may possibly render some data or HTML as well, it may render a
 heading, but what it will do for MORE involved type of presentational type things, we're gonna hand that data down.
 (So MORE presenting the data and html will done by presentation comps and not container comps)
Now obviously if you're currently working with components that are very large, even if you just added some child components, that would be
a good first step, but as you're doing that, let's try to do this container-presentation approach where we only get the data from one
spot, it acts as the boss of the data. Now it's(container comp) going to of course delegate(reach to service or store) to a service or
store and that container itself is not going to know how to call a RESTful API. But it's gonna know about the service or store that it wants
to interact with.
By breaking your components down this way, even if you're not doing the container-presentation(yes it's possible to break complex comps
this way, but not implementing the container-presentation pattern, because we're not doing the stuff that are required for that pattern.
Like the container is only responsible for getting data and pass it to children and other requirements.) and instead you need to break up a
complex component in the children, then this sets you up really well for child routes as well.

So you might have a toolbar or a tabbed interface or sth like that where when the user go to customers/44, that might automatically load the
customer component. The customer component then might have a child which is CustomerEdit and that child route might looks like:
'customers/44/edit'.
So by breaking that functionality out, even if you just have the child component, you would have more flexibility down the road, to load
that child comp DYNAMICALLY and that would be done through a child route.

            Child routes and components

                  CustomerComponent
                  /customers/44
                  /             \
   (2-way arrow) /               \
                /                 \
       CustomerEditComponent    CustomerDetailsComponent
    /customers/44/edit              customers/44/details(if you go to this route, then it would load CustomerDetailsComponent)

const routes: Route = [
  {path: 'customers/:id', component: CustomerComponent, children: [
    {path: 'edit', component: CustomerEditComponent},
    {path: 'details', component: CustomerDetailsComponent}
  ]}
];

So the point of all this is 2 things to think about.
1) Don't build ridiculously complex components. At a minimum, you're going to want to chop those complex comps up and make some
child comps.
2) As you're doing this chopping up of a big comp, into some smaller child comps, try to stick with container-presentation where in that
pattern, we have that one boss that gets the data and then the children just present the data. If you didn't need that pattern because
you don't want to load the children all at once maybe, then even by having child comps, you'd be set up well for child routes.
That can be useful is some of these children have quite a lot of information and therefore you don't want to load them all at once and
you want to load them individually based on a route. Well, that would let us do that.

Some general rules that we want to do as we're working with parent and child comps or container-presentation comps:
As we pass data from our container to presentation comp, we're gonna use @Input() props.
The other way and for communicate from the presentation to the container, we'll be use @Output.
We're gonna talk about the change detection strategy on our presentation comps and talk about why OnPush is a really good idea for them.
Also talk about comparison of reference vs value type objects that are passed into a presentation comp and why cloning can be
very helpful there and as I mentioned, if you have a parent and a child comp, then it's easy to switch that child comp to be loaded
when a route is triggered in the angular app and that can be appropriate when you JUST want to show ONE child, you want the user to bookmark
it or maybe a child comp has a lot of data and you don't want to keep it in memory along with other children and you just want to load
it when a route triggers it. So these are the things we can think about.

-pass state from container -> presentation , using @Input props
-communicate from presentation-> container using @Output props
-set change detection strategy to onPush in presentation comps
-consider cloning complex types
-use child routes as appropriate*/
/* 27-02_container and presentation components in action(and child routes):
For example in the app and in customers feature, it has it's own module and you notice there's just one component at the root of
the feature(customers) folder and that's our customers comp. Now if you see the customers comp template, you see we instantiated it's
children comps.
Important: So we instantiated the children comps in template file of their parent comp and by doing that, we can pass some data from
 parent comp to child components by using @Input() prop in the children and by property binding to those @Input props on instances of those
 child components and bind them to props in the parent comp.
Now if you go to TS files of those children you notice there's not much code in those TS files of children except those @Input() props to
receive that data from their parent and that's because we're following the container-presentation pattern.
So what we're doing is in the container(customers comp), it's responsible for using a service and we injected that service there to get the
data by creating a method which is getCustomersPage() and then calling that method in ngOnInit() of that container comp and we store
that returned data in a prop which is customers and filteredCustomers which will be equal initially when the app loads and then use [] on
the @Input props of presentation comps and bind them to those props of container comp which we stored the data on them(customers and
filteredCustomers).
Learn: So in template file of PARENT COMP we can have:
 parent comp template file;
 <child-comp-selector [@Input() prop of child comp]="the prop(or a method that returns sth) of parent comp"></child-comp-selector>
Now by doing that, we can pass that returned data to the presentation comps and they render that data.
Benefits of doing this way:
1) We're only retrieving the data from a comp standpoint in one place and that's in the container.
2) We don't have a just tremendous amount of HTML. Now the container has some html because we have our children there, but you can see
the html is minimal in the container.

If we wanted to enable child routes, in that case the children would have to go get their own data(because we couldn't instantiated them
in the parent's template and use @Input() to pass them data, so they would go get their data on their own(of course we could use subject! but
this wasn't said by the tutor))
because we wouldn't use @Input props in that case, but at least we would be set up for that, because we could simply take out the
instances of those child comps in the container template and instead add a child router outlet there and then we could dynamically
load the customers-card comp and maybe the customers-grid and map comp if we wanted.

Important: So if we use child routes with router-outlet directive, we can't use container-presentation pattern so the children should go
 get their data from service on their own and therefore the container wouldn't do that. We do that approach in customer feature.
 So for recap:
 1) Use container-presentation pattern and with that you instantiate the children comps in parent's template and use @Input and @Output and
 in this approach, the container would get the data.
 2) Use child routes with <router-outlet> which in this case you can't use container-presentation pattern, therefore we can't use @Input and
 @Output, so the children should get their data on their own.

So keep the container as the manager which is responsible for knowing how to get the data. Now I want to reemphasize, the container
shouldn't actually get the data from api and that's the role of a service or some type of a store.

When you open the app, the list view it's really a grid component behind the scenes.

Now could we use container-presentation pattern in customer feature?
YES! But by using child routes which results to be able to use <router-outlet>, 1) a user of app now is allowed to bookmark any of those
child routes and 2) another benefit is we're loading only one child component at a time in the parent comp(YES! you can also SHOW JUST).
ONE CHILD in the parent component, even by using container-presentation pattern, just like what we do in child route approach, but that
would require to use some props and set them to false and ... in order to HIDE the other children and show just one child in container-
presentation pattern, in order to get the kinda same results in that container-presentation approach. BUT you can't prevent the fact that
in container-presentation pattern you're really load those children ALL AT ONCE, but you're just SHOWING one of them, but in child route
approach, you're only LOADING 1 child and you don't need any props to hide other children.)

So we must think from architecture stand point, do we want to use container-presentation pattern or do we just want to load the
children dynamically through a child route?

Now if you go back to /customers which uses the container-presentation pattern, we're just showing and hiding those particular items which
you can make them visible and hide by clicking on them and they're all loading AT ONCE(because we're using the first approach which is
container-presentation pattern) and we aren't loading a ton of data so that loading at once won't cause harm(but maybe do harm, so that's
the first downside of first approach) and another downside is if we want to bookmark one of those items that is visible, we can't get a
directly link or url to it and if we refresh, it will go back to the first item(which is a child comp and in that case, it's customer-card).
Because there wasn't a route or url for those individual items(child comps) whereas if we used second approach like what we're doing in
customer component, we can bookmark any of those routes and if you refresh it, it stays there.

So the downsides of first approach:
1) We load the container comp itself and all of it's children AT ONCE and if we had a lot of data, that would do harm.
2) We can't bookmark all of those child comps(we can just bookmark the parent or container comp) or get a direct link to any of those
child items.
3) If we refresh we go back to parent comp or the child which by default is visible which isn't good.

If you want find out we're using a container-presentation pattern or child route pattern in a feature, you just need to check the
template file of parent component(the root component of that feature) and see there if we're instantiating the child comps or we're
using <router-outlet>?

So you need to discuss you want to use first approach or second one for features of your app.*/
/* 28-03_passing state with input and output properties:
 */
