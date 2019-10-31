const schemaTypes = `
type AgendaItem @infer {
    _uid: String
    time: String
    title: String
    subtitle: String
}

type BlogPost implements Node @infer

type LocationContent {
    title: String
    description: String
    city: String
    street: String
    postcode: String
    lat: String
    long: String
}

type Location {
    name: String
    content: LocationContent
}

type SpeakerSlotSpeaker {
    _uid: String
    name: String
    image: String
    position: String
    company: String
    about: String
    facebook_url: String
    github_url: String
    twitter_url: String
    instagram_url: String
}

type SpeakerSlot {
    topic_title: String
    topic_subtitle: String
    speaker: SpeakerSlotSpeaker
}

type NextEvent {
    name: String
    content: EventContent
}

type Edition implements Node @infer {
    nextEvent: NextEvent
}

type EventContent {
    date: String
    hero_image: String
    teaser_image: String
    blog_post: BlogPost
    location: Location
    agenda: [AgendaItem]
    speaker_slots: [SpeakerSlot]
}

type EventEdition {
    name: String
    slug: String
    full_slug: String
}

type Event implements Node @infer {
    content: EventContent
    edition: EventEdition
}
`;

module.exports = {
  schemaTypes
};
