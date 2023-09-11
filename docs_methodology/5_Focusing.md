# InceptionU Project 2

## 5.  Focusing

### Feature Ideas

When we were done dreaming, we spent some time coming up with some specific features to include in our project.

**Note:**  *This list includes some slang as well as some content that some people may find objectionable.  I've made the editorial decision to leave things as they were from our original discussions because I want to present an accurate record of our development process.*

The features that we thought we'd try to implement are in **boldface**.

- Flake detection
- Auto-delete old activities after a period of time
- For facilities that need booking, inform user and add link to booking page
- Psychological reinforcement (e.g. no. of calories burned)
- Interaction with fitness apps (e.g. FitBit)
- **Sharing contact/friend info via QR code**
- **Reviewing system for participants**
- Set calories burned for a particular type of activity
- Gender-restricted activities (e.g. Girls-Only Mud Wrestling)
- Age specific-activities (e.g. playdates for 5 year-olds vs. group outdoors yoga for 75 year-olds)
- Teaching opportunities – introduce traditional childhood games from different countries with other families/children
- Pop-up activities not just limited to public parks & greenspaces (e.g., Urban Hide &amp; Go Seek)
- Timeslots
- How soon is the game starting?
- **How long is the game planned to be?**
- Conflicts with public spaces with prior/outside booking?
- **Choose group size (e.g. “I just need 3 other people for a 2 vs. 2 game.”)**
- Starting in 15 minutes, 30 minutes, or 60 minutes Countdown Timer; anything further in the future is likely to have less participation rates (the Facebook “Maybe” Effect)
- Include weather info (forecast)
- User authentication (record MAC address)
 - 3 Strike System for Flakes?
 - Ratings system for users? → good sportsmanship, friendly, not weird, not creepy, “would play with again”, punctuality, etc.

# Use Cases

As mentioned earlier, my project management skills were quite rusty so I relied on what I'd learned during my last stint as a software developer.  We started thinking about the ways in which we expected people to use our application.

*Technically, these aren't use cases in the strictest sense.  They're closer to scrum user stories.*

This is what we came up with:

---

1. User logs in
2. User posts activity
    1. Specifies name/type (e.g., walk)
            1. Describes activity, including age/gender limitations, how strenuous it may be, duration, etc.
    2. Sets time & place
            2. Checks map for data
                    1. Loads trails, garbage cans, parking lots
                    2. Chooses a starting point
            3. Sets a date & time
                    3. Checks weather forecast
    3. Sets public or private (also any limit on number of randos)
3. User optionally sends invites to private friends
    4. Checks reviews of other users
4. User optionally adds event to device’s calendar

---

1. User logs in
2. User selects a created activity
3. User sends updates to participants

---

1. User logs in
2. User copies an existing activity
    1. Makes necessary changes
3. User sends invites to private friends
4. User optionally adds event to device’s calendar

---

1. User looks at app preview

---

1. User clicks on “About” to learn more about the app

---

1. User logs in
2. User sets location on map (or uses GPS location)
3. User sees/searches activities
    1. By area
    2. By type
    3. By time
4. User picks an activity, sees details
    1. User optionally joins
        1. User optionally adds event to device’s calendar
5. Repeat from Step 4 until user has joined all the activities they want

---

1. User logs in
2. User sees invites
3. User accepts or declines invites
    1. User optionally adds accepted events to device’s calendar

---

1. User logs in
2. User adds person to list of contacts/friends

---

1. User logs in
2. User pulls up recent activity
3. User pulls up participant
4. User reviews participant
    1. Gives a rating
    2. Gives a review (e.g., Would you play with this person again?)
    3. Reports really bad behaviour

---

1. Administrator logs in
2. Administrator reviews bad behaviour reports
3. Administrator optionally bans bad user & device

---

1. Administrator logs in
2. Administrator reviews appeals of bans
3. Administrator optionally unbans bad user &amp; device