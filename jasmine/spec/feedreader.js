/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        //test to make sure the allFeeds array is defined and is not empty
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         //test that loops through the allFeeds array and makes sure there is a url defined and is not empty for each object in the array
        it('URLs are defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed['url'].length).not.toBe(0);
                expect(feed['url']).toBeDefined();
            }
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        //test that loops through the allFeeds array and makes sure there is a name defined and is not empty for each object in the array
        it('names are defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed['name'].length).not.toBe(0);
                expect(feed['name']).toBeDefined();
            }
        });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
      //get the body element
      const body = document.querySelector('body')
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        //the css for body shows class menu-hidden
        it('is hidden by default', function() {
            //get the body element
            //const body = document.querySelector('body')
            //body should initially have menu-hidden class
            expect(body.classList).toContain('menu-hidden')
        });
        //Test ensures the menu changes when clicked.
        //since body has class menu-hidden initially we expect it will
        //not have class menu-hidden when clicked again
        it('changes when clicked', function() {
            //get menuIcon element
            const menuIcon = document.querySelector('.icon-list')
            //when menu is clicked
            menuIcon.click()
            //menu-hidden class should not exist
            expect(body.classList).not.toContain('menu-hidden')
            //click menu again
            menuIcon.click();
            //menu should be hidden
            expect(body.classList).toContain('menu-hidden')
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* test that after the loadFeed function runs there is at least
        one .entry in the feed container
         */
        beforeEach(function(done) {
            //run the loadFeed
            loadFeed(0, function() {
                //signals function is done and testing can continue
                done();
            });
        });
        //check that it has at least one entry
        it('have at least one entry', function() {
            //get the div with class .feed
            const feed = document.querySelector(".feed")
            //make sure the feed div contains at least one entry
            const entries = feed.getElementsByClassName("entry")
            //expect the length is greater than 0
            expect(entries.length).toBeGreaterThan(0);
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* test ensures that when a new feed is loaded that the content
        actually changes
         */
       //get contents of the feed container before the loadFeed
       const firstFeed = document.querySelector('.feed').innerHTML;

        beforeEach(function(done) {
            //load first feed
            loadFeed(0, function() {
                //load next feed
                loadFeed(1, function() {
                    //signals function is done and testing can continue
                    done();
                });
            });
        });


        it('content changes when new feed is loaded', function() {
            //get contents of the feed container after the loadFeed
            const nextFeed = document.querySelector('.feed').innerHTML
            //get the first two .entry feeds
            const entries = document.getElementsByClassName("entry")
                //feed container should be updated with a new feed.
                //first and second feed should be different
                expect(firstFeed).not.toEqual(nextFeed)
                expect(entries[1].innerHTML).not.toEqual(entries[0]
                    .innerHTML);
        });
    });
}());
