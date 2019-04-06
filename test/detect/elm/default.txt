import Html exposing (div, button, text)
import Html.App exposing (beginnerProgram)
import Html.Events exposing (onClick)

type Msg
    = Increment

main =
    beginnerProgram
        { model = 0, view = view
        , update = \Increment model -> model + 1 }

view model =
    div [] [ div [] [ text (toString model) ]
           , button [ onClick Increment ] [ text "+" ] ]

chars =
    String.cons 'C' <| String.cons 'h' <| "ars"
