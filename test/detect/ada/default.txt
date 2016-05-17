package body Sqlite.Simple is

      Foo : int := int'Size;
      Bar : int := long'Size;

      Error_Message_C : chars_ptr := Sqlite_Errstr (Error);
      Error_Message : String := Null_Ignore_Value (Error_Message_C);
   begin

      Named : for Index in Foo..Bar loop
          Put ("Hi[]{}");
      end loop Named;

      Foo := Bar;
   end Message;

end Sqlite.Simple;
