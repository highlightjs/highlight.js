default
{
    state_entry()
    {
        llSay(PUBLIC_CHANNEL, "Hello, Avatar!");
    }

    touch_start(integer num_detected)
    {
        llSay(PUBLIC_CHANNEL, "Touched.");
    }
}
