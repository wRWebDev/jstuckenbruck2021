const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// remove event dates on event delete
exports.onEventDelete = functions
    .region('europe-west2')
    .firestore
    .document("schedule/{eventId}")
    .onDelete( ( snapshot, ctx ) => {
        const eventId = ctx.params.eventId
        return admin.firestore()
            .collection('event_dates')
            .where('event', '==', eventId)
            .get()
            .then( dates => {
                dates.forEach( date => {
                    return admin.firestore()
                        .collection('event_dates')
                        .doc( date.id )
                        .delete()
                        .then(() => {console.log( `Deleted event_date: ${date.id}` )});
                });

            }).catch( err => console.error( new Error( err ) ) );
    });

// aggregate events
exports.onDateCreate = functions
    .region('europe-west2')
    .firestore
    .document("event_dates/{dateId}")
    .onCreate( ( snapshot ) => {
        const data = snapshot.data()
        return aggregateEvents( data.datetime );
    });

exports.onDateDelete = functions
    .region('europe-west2')
    .firestore
    .document("event_dates/{dateId}")
    .onDelete( ( snapshot ) => {
        const data = snapshot.data()
        return aggregateEvents( data.datetime );
    });

const aggregateEvents = async checkDate => {
        
    let today = new Date();

    return admin.firestore()
        .collection("event_dates")
        .orderBy("datetime", "asc")
        .where("datetime", ">=", today)
        .limit(3)
        .get()
        .then( ( snapshot ) => {

            let dates = [];

            snapshot.forEach( ( date ) => {
                dates.push( date.data() );
            });

            if ( !dates.length ) {
                console.log("No dates to process.");
                return null;
            }

            if( checkDate.toDate() > dates[dates.length - 1].datetime.toDate() ) {
                console.log( "Events do not need re-aggregating." );
                return null;
            }

            return eventsRef = admin.firestore()
                .collection("schedule")
                .where( admin.firestore.FieldPath.documentId() , "in", dates.map( date => date.event ) )
                .limit(3)
                .get()
                .then( ( snapshot ) => {
                    
                    const events = {}
                    snapshot.forEach( ( event ) => {
                        let eventData = event.data();
                        delete eventData.endDate
                        events[event.id] = eventData;
                    }); 

                    for( let i = 0; i < dates.length; i++ ) {
                        let eventID = dates[i].event;
                        dates[i] = { ...dates[i], ...events[eventID] };
                    }

                    return admin.firestore()
                        .collection("singlepage")
                        .doc("landingpage")
                        .update({
                            schedule: dates
                        });

                }).catch( err => console.error( new Error( err ) ) );
        }).catch( err => console.error( new Error( err ) ) );
}