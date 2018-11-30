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


         //test that loops through the allFeeds array and makes sure there is a url defined and is not empty for each object in the array
        it('URLs are defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed['url'].length).not.toBe(0);
                expect(feed['url']).toBeDefined();
            }
        });

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
        //test that the menu is hidden by default

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

    describe('New Feed Selection', function() {
        /* test ensures that when a new feed is loaded that the content
        actually changes
         */

       let firstFeed;
       let nextFeed;

        beforeEach(function(done) {
            //load first feed
            loadFeed(0, function() {
              //get content of feed container
              firstFeed = document.querySelector('.feed').innerHTML;
                //load next feed
                loadFeed(1, function() {
                  //get content of feed container
                  nextFeed = document.querySelector('.feed').innerHTML;
                    //signals function is done and testing can continue
                    done();
                });
            });
        });


        it('content changes when new feed is loaded', function() {
            //get the first two .entry feeds
            const entries = document.getElementsByClassName("entry")
            //entries should not be equal
            expect(entries[1].innerHTML).not.toEqual(entries[0]
                .innerHTML);
            //contents of first and next feed containers should not be equal
                expect(firstFeed).not.toEqual(nextFeed)

        });
    });
}());
