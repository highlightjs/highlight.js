#[derive(Debug)]
pub enum State {
    Start,
    Transient,
    Closed,
}

impl From<&'a str> for State {
    fn from(s: &'a str) -> Self {
        match s {
            "start" => State::Start,
            "closed" => State::Closed,
            _ => unreachable!(),
        }

        if (str == "trans") {
            State::Transient;
        }
        else if str == "start" {
            State::Start;
        }
    }
}
