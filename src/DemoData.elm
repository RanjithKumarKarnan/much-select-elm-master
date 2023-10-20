module DemoData exposing (..)

import Html exposing (Html, optgroup, option, text)
import Html.Attributes exposing (attribute, value)
import Html.Attributes.Extra
import List.Extra exposing (groupWhile)


type alias Name =
    String


type alias Description =
    String


type LordOfTheRingsCharacter
    = LordOfTheRingsCharacter Name Description LordOfTheRingsRace


type LordOfTheRingsRace
    = Dwarf
    | Elf
    | Hobbit
    | Human
    | Maiar


characters : List LordOfTheRingsCharacter
characters =
    [ LordOfTheRingsCharacter "Azaghâl" "" Dwarf
    , LordOfTheRingsCharacter "Balin" "" Dwarf
    , LordOfTheRingsCharacter "Bifur" "" Dwarf
    , LordOfTheRingsCharacter "Bofur" "" Dwarf
    , LordOfTheRingsCharacter "Bombur" "" Dwarf
    , LordOfTheRingsCharacter "Borin" "" Dwarf
    , LordOfTheRingsCharacter "Deathshriek" "" Dwarf
    , LordOfTheRingsCharacter "Dori" "" Dwarf
    , LordOfTheRingsCharacter "Durin VII" "" Dwarf
    , LordOfTheRingsCharacter "Dwalin" "" Dwarf
    , LordOfTheRingsCharacter "Dáin I" "" Dwarf
    , LordOfTheRingsCharacter "Dáin II Ironfoot" "" Dwarf
    , LordOfTheRingsCharacter "Dís" "" Dwarf
    , LordOfTheRingsCharacter "Farin" "" Dwarf
    , LordOfTheRingsCharacter "Flói" "" Dwarf
    , LordOfTheRingsCharacter "Frerin" "" Dwarf
    , LordOfTheRingsCharacter "Frár" "" Dwarf
    , LordOfTheRingsCharacter "Frór" "" Dwarf
    , LordOfTheRingsCharacter "Fundin" "" Dwarf
    , LordOfTheRingsCharacter "Fíli and Kíli" "" Dwarf
    , LordOfTheRingsCharacter "Galar" "" Dwarf
    , LordOfTheRingsCharacter "Gimli" "" Dwarf
    , LordOfTheRingsCharacter "Glóin" "" Dwarf
    , LordOfTheRingsCharacter "Glóin (King of Durin's Folk)" "" Dwarf
    , LordOfTheRingsCharacter "Gróin" "" Dwarf
    , LordOfTheRingsCharacter "Grór" "" Dwarf
    , LordOfTheRingsCharacter "Ibûn" "" Dwarf
    , LordOfTheRingsCharacter "Lóni" "" Dwarf
    , LordOfTheRingsCharacter "Mîm" "" Dwarf
    , LordOfTheRingsCharacter "Naugladur" "" Dwarf
    , LordOfTheRingsCharacter "Nori" "" Dwarf
    , LordOfTheRingsCharacter "Náin (father of Dáin II Ironfoot)" "" Dwarf
    , LordOfTheRingsCharacter "Náin I" "" Dwarf
    , LordOfTheRingsCharacter "Náin II" "" Dwarf
    , LordOfTheRingsCharacter "Náli" "" Dwarf
    , LordOfTheRingsCharacter "Nár" "" Dwarf
    , LordOfTheRingsCharacter "Ori" "" Dwarf
    , LordOfTheRingsCharacter "Telchar" "" Dwarf
    , LordOfTheRingsCharacter "Thorin I" "" Dwarf
    , LordOfTheRingsCharacter "Thorin II Oakenshield" "" Dwarf
    , LordOfTheRingsCharacter "Thorin III Stonehelm" "" Dwarf
    , LordOfTheRingsCharacter "Thráin I" "" Dwarf
    , LordOfTheRingsCharacter "Thráin II" "" Dwarf
    , LordOfTheRingsCharacter "Thrór" "" Dwarf
    , LordOfTheRingsCharacter "Óin" "" Dwarf
    , LordOfTheRingsCharacter "Óin (King of Durin's Folk)" "" Dwarf
    , LordOfTheRingsCharacter "Durin" "" Dwarf
    , LordOfTheRingsCharacter "Aegnor" "" Elf
    , LordOfTheRingsCharacter "Amarië" "" Elf
    , LordOfTheRingsCharacter "Amdír" "" Elf
    , LordOfTheRingsCharacter "Amras" "" Elf
    , LordOfTheRingsCharacter "Amrod" "" Elf
    , LordOfTheRingsCharacter "Amroth" "" Elf
    , LordOfTheRingsCharacter "Anairë" "" Elf
    , LordOfTheRingsCharacter "Angrod" "" Elf
    , LordOfTheRingsCharacter "Annael" "" Elf
    , LordOfTheRingsCharacter "Aranwë" "" Elf
    , LordOfTheRingsCharacter "Aredhel" "" Elf
    , LordOfTheRingsCharacter "Argon" "" Elf
    , LordOfTheRingsCharacter "Arminas" "" Elf
    , LordOfTheRingsCharacter "Arwen" "" Elf
    , LordOfTheRingsCharacter "Caranthir" "" Elf
    , LordOfTheRingsCharacter "Celeborn" "" Elf
    , LordOfTheRingsCharacter "Celebrimbor" "" Elf
    , LordOfTheRingsCharacter "Celebrían" "" Elf
    , LordOfTheRingsCharacter "Celegorm" "" Elf
    , LordOfTheRingsCharacter "Curufin" "" Elf
    , LordOfTheRingsCharacter "Círdan" "" Elf
    , LordOfTheRingsCharacter "Denethor (First Age)" "" Elf
    , LordOfTheRingsCharacter "Edrahil" "" Elf
    , LordOfTheRingsCharacter "Eldalótë" "" Elf
    , LordOfTheRingsCharacter "Elemmírë (elf)" "" Elf
    , LordOfTheRingsCharacter "Elenwë" "" Elf
    , LordOfTheRingsCharacter "Elladan and Elrohir" "" Elf
    , LordOfTheRingsCharacter "Elrond" "" Elf
    , LordOfTheRingsCharacter "Enel" "" Elf
    , LordOfTheRingsCharacter "Enelyë" "" Elf
    , LordOfTheRingsCharacter "Enerdhil" "" Elf
    , LordOfTheRingsCharacter "Erellont" "" Elf
    , LordOfTheRingsCharacter "Erestor" "" Elf
    , LordOfTheRingsCharacter "Eärwen" "" Elf
    , LordOfTheRingsCharacter "Eöl" "" Elf
    , LordOfTheRingsCharacter "Finarfin" "" Elf
    , LordOfTheRingsCharacter "Findis" "" Elf
    , LordOfTheRingsCharacter "Finduilas" "" Elf
    , LordOfTheRingsCharacter "Fingolfin" "" Elf
    , LordOfTheRingsCharacter "Fingon" "" Elf
    , LordOfTheRingsCharacter "Finrod" "" Elf
    , LordOfTheRingsCharacter "Finwë" "" Elf
    , LordOfTheRingsCharacter "Fëanor" "" Elf
    , LordOfTheRingsCharacter "Galadriel" "" Elf
    , LordOfTheRingsCharacter "Galdor of the Havens" "" Elf
    , LordOfTheRingsCharacter "Galion" "" Elf
    , LordOfTheRingsCharacter "Gelmir" "" Elf
    , LordOfTheRingsCharacter "Gelmir (of Angrod's kin)" "" Elf
    , LordOfTheRingsCharacter "Gil-galad" "" Elf
    , LordOfTheRingsCharacter "Gildor Inglorion" "" Elf
    , LordOfTheRingsCharacter "Gilfanon" "" Elf
    , LordOfTheRingsCharacter "Glorfindel" "" Elf
    , LordOfTheRingsCharacter "Guilin" "" Elf
    , LordOfTheRingsCharacter "Gwindor" "" Elf
    , LordOfTheRingsCharacter "Haldir (Lorien)" "" Elf
    , LordOfTheRingsCharacter "Hendor" "" Elf
    , LordOfTheRingsCharacter "Idril" "" Elf
    , LordOfTheRingsCharacter "Imin" "" Elf
    , LordOfTheRingsCharacter "Iminyë" "" Elf
    , LordOfTheRingsCharacter "Indis" "" Elf
    , LordOfTheRingsCharacter "Ingwion" "" Elf
    , LordOfTheRingsCharacter "Ingwë" "" Elf
    , LordOfTheRingsCharacter "Legolas" "" Elf
    , LordOfTheRingsCharacter "Lenwë" "" Elf
    , LordOfTheRingsCharacter "Lindir" "" Elf
    , LordOfTheRingsCharacter "Lindo" "" Elf
    , LordOfTheRingsCharacter "Lúthien" "" Elf
    , LordOfTheRingsCharacter "Maedhros" "" Elf
    , LordOfTheRingsCharacter "Maeglin" "" Elf
    , LordOfTheRingsCharacter "Maglor" "" Elf
    , LordOfTheRingsCharacter "Mahtan" "" Elf
    , LordOfTheRingsCharacter "Meril-i-Turinqi" "" Elf
    , LordOfTheRingsCharacter "Mithrellas" "" Elf
    , LordOfTheRingsCharacter "Morwë" "" Elf
    , LordOfTheRingsCharacter "Míriel" "" Elf
    , LordOfTheRingsCharacter "Nerdanel" "" Elf
    , LordOfTheRingsCharacter "Nimrodel" "" Elf
    , LordOfTheRingsCharacter "Nurwë" "" Elf
    , LordOfTheRingsCharacter "Olwë" "" Elf
    , LordOfTheRingsCharacter "Orodreth" "" Elf
    , LordOfTheRingsCharacter "Oropher" "" Elf
    , LordOfTheRingsCharacter "Orophin" "" Elf
    , LordOfTheRingsCharacter "Pengolodh" "" Elf
    , LordOfTheRingsCharacter "Rúmil (Noldo)" "" Elf
    , LordOfTheRingsCharacter "Rúmil of Lórien" "" Elf
    , LordOfTheRingsCharacter "Tata" "" Elf
    , LordOfTheRingsCharacter "Tatië" "" Elf
    , LordOfTheRingsCharacter "Thranduil" "" Elf
    , LordOfTheRingsCharacter "Tulkastor" "" Elf
    , LordOfTheRingsCharacter "Turgon" "" Elf
    , LordOfTheRingsCharacter "Vairë (Elf)" "" Elf
    , LordOfTheRingsCharacter "Voronwë" "" Elf
    , LordOfTheRingsCharacter "Írimë" "" Elf
    , LordOfTheRingsCharacter "Nimloth (elf)" "" Elf
    , LordOfTheRingsCharacter "Legolas (elf of Gondolin)" "" Elf
    , LordOfTheRingsCharacter "Elemmakil" "" Elf
    , LordOfTheRingsCharacter "Thingol" "" Elf
    , LordOfTheRingsCharacter "Angelica Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Balbo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Belladonna (Took) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Berylla (Boffin) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Bungo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Drogo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Dudo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Fosco Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Frodo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Laura (Grubb) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Longo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Mungo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Peony (Baggins) Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Ponto Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Ponto Baggins II" "" Hobbit
    , LordOfTheRingsCharacter "Porto Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Bilbo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Blanco" "" Hobbit
    , LordOfTheRingsCharacter "Bob" "" Hobbit
    , LordOfTheRingsCharacter "Donnamira (Took) Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Basso Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Bosco Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Buffo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Daisy (Baggins) Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Druda Burrows Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Folco Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Gerda (Boffin) Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Griffo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Hugo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Ivy (Goodenough) Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Jago Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Otto Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Rollo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Tosto Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Vigo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Filibert Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Fredegar Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Jessamine (Boffin) Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Odovacar Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Rosamunda (Took) Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Wilibald Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Blanco Bracegirdle" "" Hobbit
    , LordOfTheRingsCharacter "Bruno Bracegirdle" "" Hobbit
    , LordOfTheRingsCharacter "Primrose Bracegirdle" "" Hobbit
    , LordOfTheRingsCharacter "Adaldrida (Bolger) Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Amaranth Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Celandine Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Esmeralda Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Estella (Bolger) Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Hilda Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Madoc Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Melilot Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Mentha Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Meriadoc Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Mirabella (Took) Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Primula (Brandybuck) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Seredic Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Sapphira (Brockhouse) Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Bucca of the Marish" "" Hobbit
    , LordOfTheRingsCharacter "Asphodel (Brandybuck) Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Milo Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Minto Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Falco Chubb-Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Bowman Cotton" "" Hobbit
    , LordOfTheRingsCharacter "Lily Cotton" "" Hobbit
    , LordOfTheRingsCharacter "Marigold (Gamgee) Cotton" "" Hobbit
    , LordOfTheRingsCharacter "Rosie Cotton" "" Hobbit
    , LordOfTheRingsCharacter "Tolman Cotton" "" Hobbit
    , LordOfTheRingsCharacter "Diamond Took" "" Hobbit
    , LordOfTheRingsCharacter "Dinodas Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Dodinas Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Déagol" "" Hobbit
    , LordOfTheRingsCharacter "Eglantine (Banks) Took" "" Hobbit
    , LordOfTheRingsCharacter "Fastolph Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Ferumbras Took II" "" Hobbit
    , LordOfTheRingsCharacter "Fortinbras Took I" "" Hobbit
    , LordOfTheRingsCharacter "Daisy Gamgee I" "" Hobbit
    , LordOfTheRingsCharacter "Frodo Gardner" "" Hobbit
    , LordOfTheRingsCharacter "Halfred Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Hamfast Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Hamson Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "May Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Samwise Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Elanor Gardner" "" Hobbit
    , LordOfTheRingsCharacter "Hanna (Goldworthy) Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Gorbulas Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Gorhendad (Oldbuck) Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Gormadoc Deepdelver Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Erling Greenhand" "" Hobbit
    , LordOfTheRingsCharacter "Halfred Greenhand" "" Hobbit
    , LordOfTheRingsCharacter "Hending Greenhand" "" Hobbit
    , LordOfTheRingsCharacter "Holman Greenhand" "" Hobbit
    , LordOfTheRingsCharacter "Rose Greenhand" "" Hobbit
    , LordOfTheRingsCharacter "Hamfast of Gamwich" "" Hobbit
    , LordOfTheRingsCharacter "Hob Gammidge" "" Hobbit
    , LordOfTheRingsCharacter "Hob Hayward" "" Hobbit
    , LordOfTheRingsCharacter "Holfast Gardner" "" Hobbit
    , LordOfTheRingsCharacter "Tobias Hornblower" "" Hobbit
    , LordOfTheRingsCharacter "Isembold Took" "" Hobbit
    , LordOfTheRingsCharacter "Isengrim Took III" "" Hobbit
    , LordOfTheRingsCharacter "Farmer Maggot" "" Hobbit
    , LordOfTheRingsCharacter "Malva Headstrong Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Marcho" "" Hobbit
    , LordOfTheRingsCharacter "Marmadas Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Marroc Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Merimas Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Nina Lightfoot" "" Hobbit
    , LordOfTheRingsCharacter "Nob" "" Hobbit
    , LordOfTheRingsCharacter "Old Noakes" "" Hobbit
    , LordOfTheRingsCharacter "Otho Sackville-Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Mrs. Proudfoot" "" Hobbit
    , LordOfTheRingsCharacter "Odo Proudfoot" "" Hobbit
    , LordOfTheRingsCharacter "Rowan Greenhand" "" Hobbit
    , LordOfTheRingsCharacter "Rudigar Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Rufus Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Lobelia Sackville-Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Lotho Sackville-Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Sadoc Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Ted Sandyman" "" Hobbit
    , LordOfTheRingsCharacter "Saradas Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Robin Smallburrow" "" Hobbit
    , LordOfTheRingsCharacter "Technobliterator" "" Hobbit
    , LordOfTheRingsCharacter "Faramir Took I" "" Hobbit
    , LordOfTheRingsCharacter "Isumbras Took I" "" Hobbit
    , LordOfTheRingsCharacter "Fortinbras Took II" "" Hobbit
    , LordOfTheRingsCharacter "Isengrim Took II" "" Hobbit
    , LordOfTheRingsCharacter "Isumbras Took III" "" Hobbit
    , LordOfTheRingsCharacter "Adalgrim Took" "" Hobbit
    , LordOfTheRingsCharacter "Adamanta (Chubb) Took" "" Hobbit
    , LordOfTheRingsCharacter "Adelard Took" "" Hobbit
    , LordOfTheRingsCharacter "Bandobras Took" "" Hobbit
    , LordOfTheRingsCharacter "Ferumbras III Took" "" Hobbit
    , LordOfTheRingsCharacter "Gerontius Took" "" Hobbit
    , LordOfTheRingsCharacter "Hildibrand Took" "" Hobbit
    , LordOfTheRingsCharacter "Hildifons Took" "" Hobbit
    , LordOfTheRingsCharacter "Hildigrim Took" "" Hobbit
    , LordOfTheRingsCharacter "Isembard Took" "" Hobbit
    , LordOfTheRingsCharacter "Paladin Took II" "" Hobbit
    , LordOfTheRingsCharacter "Pearl Took" "" Hobbit
    , LordOfTheRingsCharacter "Peregrin Took" "" Hobbit
    , LordOfTheRingsCharacter "Rosa (Baggins) Took" "" Hobbit
    , LordOfTheRingsCharacter "Sigismond Took" "" Hobbit
    , LordOfTheRingsCharacter "Willie Banks" "" Hobbit
    , LordOfTheRingsCharacter "Wiseman Gamwich" "" Hobbit
    , LordOfTheRingsCharacter "Bingo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Chica (Chubb) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Dora Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Largo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Mimosa (Bunce) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Pansy Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Polo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Ponto Baggins I" "" Hobbit
    , LordOfTheRingsCharacter "Ruby (Bolger) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Adalgar Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Gundahar Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Prisca (Baggins) Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Rudibert Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Theobald Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Wilimar Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Camellia (Sackville) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Everard Took" "" Hobbit
    , LordOfTheRingsCharacter "Ferdibrand Took" "" Hobbit
    , LordOfTheRingsCharacter "Ferdinand Took" "" Hobbit
    , LordOfTheRingsCharacter "Flambard Took" "" Hobbit
    , LordOfTheRingsCharacter "Lalia (Clayhanger) Took" "" Hobbit
    , LordOfTheRingsCharacter "Pervinca Took" "" Hobbit
    , LordOfTheRingsCharacter "Pimpernel Took" "" Hobbit
    , LordOfTheRingsCharacter "Reginard Took" "" Hobbit
    , LordOfTheRingsCharacter "Ruby Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Rudolph Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Tanta (Hornblower) Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Inigo Baggins" "" Hobbit
    , LordOfTheRingsCharacter "Tanta Hornblower" "" Hobbit
    , LordOfTheRingsCharacter "Tobold Hornblower" "" Hobbit
    , LordOfTheRingsCharacter "Lily (Baggins) Goodbody" "" Hobbit
    , LordOfTheRingsCharacter "Bell (Goodchild) Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Togo Goodbody" "" Hobbit
    , LordOfTheRingsCharacter "Goldberry" "" Hobbit
    , LordOfTheRingsCharacter "Goldilocks (Gardner) Took" "" Hobbit
    , LordOfTheRingsCharacter "Merry Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Bilbo Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Halfast Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Rose Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Hamfast Gardner" "" Hobbit
    , LordOfTheRingsCharacter "Pippin Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Primrose Gardner" "" Hobbit
    , LordOfTheRingsCharacter "Robin Gardner" "" Hobbit
    , LordOfTheRingsCharacter "Poppy (Chubb-Baggins) Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Tolman Cotton Jr." "" Hobbit
    , LordOfTheRingsCharacter "Carl Cotton" "" Hobbit
    , LordOfTheRingsCharacter "Wilcome Cotton" "" Hobbit
    , LordOfTheRingsCharacter "Daisy Gamgee" "" Hobbit
    , LordOfTheRingsCharacter "Berilac Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Doderic Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Gorbadoc Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Ilberic Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Marmadoc Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Merimac Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Orgulas Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Rorimac Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Salvia (Brandybuck) Bolger" "" Hobbit
    , LordOfTheRingsCharacter "Bilbo Gardner" "" Hobbit
    , LordOfTheRingsCharacter "Briffo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Gruffo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Lavender (Grubb) Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Uffo Boffin" "" Hobbit
    , LordOfTheRingsCharacter "Bodo Proudfoot" "" Hobbit
    , LordOfTheRingsCharacter "Linda (Baggins) Proudfoot" "" Hobbit
    , LordOfTheRingsCharacter "Sancho Proudfoot" "" Hobbit
    , LordOfTheRingsCharacter "Olo Proudfoot" "" Hobbit
    , LordOfTheRingsCharacter "Saradoc Brandybuck" "" Hobbit
    , LordOfTheRingsCharacter "Gollum" "" Hobbit
    , LordOfTheRingsCharacter "Moro Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Mosco Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Myrtle Burrows" "" Hobbit
    , LordOfTheRingsCharacter "Adanel" "" Human
    , LordOfTheRingsCharacter "Adrahil I" "" Human
    , LordOfTheRingsCharacter "Adrahil II" "" Human
    , LordOfTheRingsCharacter "Aerin" "" Human
    , LordOfTheRingsCharacter "Aglahad" "" Human
    , LordOfTheRingsCharacter "Ailinel" "" Human
    , LordOfTheRingsCharacter "Aldamir" "" Human
    , LordOfTheRingsCharacter "Aldor" "" Human
    , LordOfTheRingsCharacter "Algund" "" Human
    , LordOfTheRingsCharacter "Almarian" "" Human
    , LordOfTheRingsCharacter "Almiel" "" Human
    , LordOfTheRingsCharacter "Alphros" "" Human
    , LordOfTheRingsCharacter "Amandil" "" Human
    , LordOfTheRingsCharacter "Amlaith" "" Human
    , LordOfTheRingsCharacter "Amrothos" "" Human
    , LordOfTheRingsCharacter "Anardil" "" Human
    , LordOfTheRingsCharacter "Anborn" "" Human
    , LordOfTheRingsCharacter "Andreth" "" Human
    , LordOfTheRingsCharacter "Andróg" "" Human
    , LordOfTheRingsCharacter "Angamaitë" "" Human
    , LordOfTheRingsCharacter "Angbor" "" Human
    , LordOfTheRingsCharacter "Angelimir" "" Human
    , LordOfTheRingsCharacter "Anárion" "" Human
    , LordOfTheRingsCharacter "Ar-Adûnakhôr" "" Human
    , LordOfTheRingsCharacter "Ar-Gimilzôr" "" Human
    , LordOfTheRingsCharacter "Ar-Pharazôn" "" Human
    , LordOfTheRingsCharacter "Ar-Sakalthôr" "" Human
    , LordOfTheRingsCharacter "Ar-Zimrathôn" "" Human
    , LordOfTheRingsCharacter "Arador" "" Human
    , LordOfTheRingsCharacter "Araglas" "" Human
    , LordOfTheRingsCharacter "Aragorn I" "" Human
    , LordOfTheRingsCharacter "Aragorn II Elessar" "" Human
    , LordOfTheRingsCharacter "Aragost" "" Human
    , LordOfTheRingsCharacter "Arahad I" "" Human
    , LordOfTheRingsCharacter "Arahad II" "" Human
    , LordOfTheRingsCharacter "Arahael" "" Human
    , LordOfTheRingsCharacter "Aranarth" "" Human
    , LordOfTheRingsCharacter "Arantar" "" Human
    , LordOfTheRingsCharacter "Aranuir" "" Human
    , LordOfTheRingsCharacter "Araphant" "" Human
    , LordOfTheRingsCharacter "Araphor" "" Human
    , LordOfTheRingsCharacter "Arassuil" "" Human
    , LordOfTheRingsCharacter "Aratan" "" Human
    , LordOfTheRingsCharacter "Arathorn I" "" Human
    , LordOfTheRingsCharacter "Arathorn II" "" Human
    , LordOfTheRingsCharacter "Araval" "" Human
    , LordOfTheRingsCharacter "Aravir" "" Human
    , LordOfTheRingsCharacter "Aravorn" "" Human
    , LordOfTheRingsCharacter "Arciryas" "" Human
    , LordOfTheRingsCharacter "Ardamir (son of Axantur)" "" Human
    , LordOfTheRingsCharacter "Argeleb I" "" Human
    , LordOfTheRingsCharacter "Argeleb II" "" Human
    , LordOfTheRingsCharacter "Argonui" "" Human
    , LordOfTheRingsCharacter "Arthad" "" Human
    , LordOfTheRingsCharacter "Arvedui" "" Human
    , LordOfTheRingsCharacter "Arvegil" "" Human
    , LordOfTheRingsCharacter "Arveleg I" "" Human
    , LordOfTheRingsCharacter "Arveleg II" "" Human
    , LordOfTheRingsCharacter "Atanalcar" "" Human
    , LordOfTheRingsCharacter "Atanatar I" "" Human
    , LordOfTheRingsCharacter "Atanatar II" "" Human
    , LordOfTheRingsCharacter "Aulendil (Vardamir's son)" "" Human
    , LordOfTheRingsCharacter "Axantur" "" Human
    , LordOfTheRingsCharacter "Bain" "" Human
    , LordOfTheRingsCharacter "Baragund" "" Human
    , LordOfTheRingsCharacter "Barahir" "" Human
    , LordOfTheRingsCharacter "Barahir (Steward)" "" Human
    , LordOfTheRingsCharacter "Baran" "" Human
    , LordOfTheRingsCharacter "Baranor" "" Human
    , LordOfTheRingsCharacter "Baranor (Gondor)" "" Human
    , LordOfTheRingsCharacter "Bard" "" Human
    , LordOfTheRingsCharacter "Bard II" "" Human
    , LordOfTheRingsCharacter "Beldir" "" Human
    , LordOfTheRingsCharacter "Beldis" "" Human
    , LordOfTheRingsCharacter "Belecthor I" "" Human
    , LordOfTheRingsCharacter "Belecthor II" "" Human
    , LordOfTheRingsCharacter "Beleg of Arnor" "" Human
    , LordOfTheRingsCharacter "Belegorn" "" Human
    , LordOfTheRingsCharacter "Belegund" "" Human
    , LordOfTheRingsCharacter "Belemir" "" Human
    , LordOfTheRingsCharacter "Belen" "" Human
    , LordOfTheRingsCharacter "Beorn" "" Human
    , LordOfTheRingsCharacter "Bereg" "" Human
    , LordOfTheRingsCharacter "Beregond" "" Human
    , LordOfTheRingsCharacter "Beregond (Captain)" "" Human
    , LordOfTheRingsCharacter "Berelach" "" Human
    , LordOfTheRingsCharacter "Beren" "" Human
    , LordOfTheRingsCharacter "Beren (Belemir's son)" "" Human
    , LordOfTheRingsCharacter "Beren (Steward)" "" Human
    , LordOfTheRingsCharacter "Bergil" "" Human
    , LordOfTheRingsCharacter "Black Serpent" "" Human
    , LordOfTheRingsCharacter "Bladorthin" "" Human
    , LordOfTheRingsCharacter "Borlach" "" Human
    , LordOfTheRingsCharacter "Borlad" "" Human
    , LordOfTheRingsCharacter "Borlas" "" Human
    , LordOfTheRingsCharacter "Boromir" "" Human
    , LordOfTheRingsCharacter "Boromir (House of Bëor)" "" Human
    , LordOfTheRingsCharacter "Boromir (Steward)" "" Human
    , LordOfTheRingsCharacter "Boron" "" Human
    , LordOfTheRingsCharacter "Borondir" "" Human
    , LordOfTheRingsCharacter "Borthand" "" Human
    , LordOfTheRingsCharacter "Brand" "" Human
    , LordOfTheRingsCharacter "Brandir" "" Human
    , LordOfTheRingsCharacter "Brego" "" Human
    , LordOfTheRingsCharacter "Bregolas" "" Human
    , LordOfTheRingsCharacter "Bregor" "" Human
    , LordOfTheRingsCharacter "Bëor" "" Human
    , LordOfTheRingsCharacter "Bór" "" Human
    , LordOfTheRingsCharacter "Calimehtar" "" Human
    , LordOfTheRingsCharacter "Caliondo" "" Human
    , LordOfTheRingsCharacter "Calmacil" "" Human
    , LordOfTheRingsCharacter "Castamir the Usurper" "" Human
    , LordOfTheRingsCharacter "Celebrindor" "" Human
    , LordOfTheRingsCharacter "Celepharn" "" Human
    , LordOfTheRingsCharacter "Cemendur" "" Human
    , LordOfTheRingsCharacter "Cemendur (son of Axantur)" "" Human
    , LordOfTheRingsCharacter "Ceorl" "" Human
    , LordOfTheRingsCharacter "Cirion" "" Human
    , LordOfTheRingsCharacter "Ciryandil" "" Human
    , LordOfTheRingsCharacter "Ciryatur" "" Human
    , LordOfTheRingsCharacter "Ciryon" "" Human
    , LordOfTheRingsCharacter "Dairuin" "" Human
    , LordOfTheRingsCharacter "Damrod" "" Human
    , LordOfTheRingsCharacter "Denethor I" "" Human
    , LordOfTheRingsCharacter "Denethor II" "" Human
    , LordOfTheRingsCharacter "Derufin" "" Human
    , LordOfTheRingsCharacter "Dervorin" "" Human
    , LordOfTheRingsCharacter "Dior (Steward)" "" Human
    , LordOfTheRingsCharacter "Dorlas" "" Human
    , LordOfTheRingsCharacter "Duilin" "" Human
    , LordOfTheRingsCharacter "Duinhir" "" Human
    , LordOfTheRingsCharacter "Déor" "" Human
    , LordOfTheRingsCharacter "Déorwine" "" Human
    , LordOfTheRingsCharacter "Dírhael" "" Human
    , LordOfTheRingsCharacter "Dírhavel" "" Human
    , LordOfTheRingsCharacter "Dúnhere" "" Human
    , LordOfTheRingsCharacter "Ecthelion I" "" Human
    , LordOfTheRingsCharacter "Ecthelion II" "" Human
    , LordOfTheRingsCharacter "Egalmoth" "" Human
    , LordOfTheRingsCharacter "Eilinel" "" Human
    , LordOfTheRingsCharacter "Elatan" "" Human
    , LordOfTheRingsCharacter "Elboron" "" Human
    , LordOfTheRingsCharacter "Eldacar (King of Arnor)" "" Human
    , LordOfTheRingsCharacter "Eldacar (King of Gondor)" "" Human
    , LordOfTheRingsCharacter "Eldarion" "" Human
    , LordOfTheRingsCharacter "Elendil" "" Human
    , LordOfTheRingsCharacter "Elendur" "" Human
    , LordOfTheRingsCharacter "Elendur of Arnor" "" Human
    , LordOfTheRingsCharacter "Elfhelm" "" Human
    , LordOfTheRingsCharacter "Elfhild" "" Human
    , LordOfTheRingsCharacter "Elfwine" "" Human
    , LordOfTheRingsCharacter "Elphir" "" Human
    , LordOfTheRingsCharacter "Emeldir" "" Human
    , LordOfTheRingsCharacter "Éomer" "" Human
    , LordOfTheRingsCharacter "Eorl the Young" "" Human
    , LordOfTheRingsCharacter "Éowyn" "" Human
    , LordOfTheRingsCharacter "Eradan" "" Human
    , LordOfTheRingsCharacter "Erchirion" "" Human
    , LordOfTheRingsCharacter "Erendis" "" Human
    , LordOfTheRingsCharacter "Erkenbrand" "" Human
    , LordOfTheRingsCharacter "Estelmo" "" Human
    , LordOfTheRingsCharacter "Eärendil of Gondor" "" Human
    , LordOfTheRingsCharacter "Eärendur (Lord of Andúnië)" "" Human
    , LordOfTheRingsCharacter "Eärendur of Arnor" "" Human
    , LordOfTheRingsCharacter "Eärendur of Númenor" "" Human
    , LordOfTheRingsCharacter "Eärnil I" "" Human
    , LordOfTheRingsCharacter "Eärnil II" "" Human
    , LordOfTheRingsCharacter "Eärnur" "" Human
    , LordOfTheRingsCharacter "Faramir" "" Human
    , LordOfTheRingsCharacter "Faramir (son of Ondoher)" "" Human
    , LordOfTheRingsCharacter "Fastred" "" Human
    , LordOfTheRingsCharacter "Fastred (Pelennor Fields)" "" Human
    , LordOfTheRingsCharacter "Fengel" "" Human
    , LordOfTheRingsCharacter "Findegil" "" Human
    , LordOfTheRingsCharacter "Finduilas of Dol Amroth" "" Human
    , LordOfTheRingsCharacter "Folca" "" Human
    , LordOfTheRingsCharacter "Folcred" "" Human
    , LordOfTheRingsCharacter "Folcwine" "" Human
    , LordOfTheRingsCharacter "Forlong" "" Human
    , LordOfTheRingsCharacter "Forthwini" "" Human
    , LordOfTheRingsCharacter "Forweg" "" Human
    , LordOfTheRingsCharacter "Fram" "" Human
    , LordOfTheRingsCharacter "Freca" "" Human
    , LordOfTheRingsCharacter "Frumgar" "" Human
    , LordOfTheRingsCharacter "Fréa" "" Human
    , LordOfTheRingsCharacter "Fréaláf Hildeson" "" Human
    , LordOfTheRingsCharacter "Fréawine" "" Human
    , LordOfTheRingsCharacter "Fíriel" "" Human
    , LordOfTheRingsCharacter "Galdor" "" Human
    , LordOfTheRingsCharacter "Gamling" "" Human
    , LordOfTheRingsCharacter "Gethron" "" Human
    , LordOfTheRingsCharacter "Ghân-buri-Ghân" "" Human
    , LordOfTheRingsCharacter "Gildis" "" Human
    , LordOfTheRingsCharacter "Gildor (Edain)" "" Human
    , LordOfTheRingsCharacter "Gilraen" "" Human
    , LordOfTheRingsCharacter "Gimilkhâd" "" Human
    , LordOfTheRingsCharacter "Gimilzagar" "" Human
    , LordOfTheRingsCharacter "Girion" "" Human
    , LordOfTheRingsCharacter "Glirhuin" "" Human
    , LordOfTheRingsCharacter "Gléowine" "" Human
    , LordOfTheRingsCharacter "Glóredhel" "" Human
    , LordOfTheRingsCharacter "Golasgil" "" Human
    , LordOfTheRingsCharacter "Goldwine" "" Human
    , LordOfTheRingsCharacter "Gorlim" "" Human
    , LordOfTheRingsCharacter "Gram" "" Human
    , LordOfTheRingsCharacter "Grimbeorn" "" Human
    , LordOfTheRingsCharacter "Grimbold" "" Human
    , LordOfTheRingsCharacter "Grithnir" "" Human
    , LordOfTheRingsCharacter "Gundor" "" Human
    , LordOfTheRingsCharacter "Guthláf" "" Human
    , LordOfTheRingsCharacter "Gálmód" "" Human
    , LordOfTheRingsCharacter "Gárulf" "" Human
    , LordOfTheRingsCharacter "Hador" "" Human
    , LordOfTheRingsCharacter "Hador (Steward)" "" Human
    , LordOfTheRingsCharacter "Halbarad" "" Human
    , LordOfTheRingsCharacter "Radagast" "" Maiar
    , LordOfTheRingsCharacter "Gandalf" "" Maiar
    , LordOfTheRingsCharacter "Saruman" "" Maiar
    , LordOfTheRingsCharacter "Tilion" "" Maiar
    , LordOfTheRingsCharacter "Sauron" "" Maiar
    , LordOfTheRingsCharacter "Eönwë" "" Maiar
    , LordOfTheRingsCharacter "Durin's Bane" "" Maiar
    , LordOfTheRingsCharacter "Alatar" "" Maiar
    , LordOfTheRingsCharacter "Pallando" "" Maiar
    , LordOfTheRingsCharacter "Arien" "" Maiar
    , LordOfTheRingsCharacter "Uinen" "" Maiar
    ]


wizards =
    List.filter
        (\c ->
            case c of
                LordOfTheRingsCharacter _ _ race ->
                    race == Maiar
        )
        characters
        |> List.map
            (\c ->
                case c of
                    LordOfTheRingsCharacter name description _ ->
                        let
                            descriptionAttr =
                                if String.length description > 0 then
                                    attribute "data-description" description

                                else
                                    Html.Attributes.Extra.empty
                        in
                        option [ descriptionAttr ] [ text name ]
            )


groupOptionsInOrder : List LordOfTheRingsCharacter -> List ( LordOfTheRingsRace, List LordOfTheRingsCharacter )
groupOptionsInOrder options =
    let
        helper : LordOfTheRingsCharacter -> LordOfTheRingsCharacter -> Bool
        helper optionA optionB =
            getRace optionA == getRace optionB
    in
    groupWhile helper options
        |> List.map (\( first, rest ) -> ( getRace first, first :: rest ))


allOptions : List (Html msg)
allOptions =
    charactersToHtmlWithOptgroups characters


charactersToHtmlWithOptgroups : List LordOfTheRingsCharacter -> List (Html msg)
charactersToHtmlWithOptgroups lordOfTheRingsCharacters =
    lordOfTheRingsCharacters
        |> groupOptionsInOrder
        |> List.map
            (\( race, characters_ ) ->
                optgroup [ attribute "label" (raceToString race) ] (List.map characterToOption characters_)
            )


makeOptionElement : String -> String -> Maybe String -> Html msg
makeOptionElement label valueStr maybeDescription =
    let
        descriptionAttr =
            case maybeDescription of
                Just description ->
                    attribute "data-description" description

                Nothing ->
                    Html.Attributes.Extra.empty
    in
    option [ descriptionAttr, value valueStr ] [ text label ]


filteredOptions : String -> Int -> List LordOfTheRingsCharacter
filteredOptions searchString maxNumberOfResults =
    if (searchString |> String.trim |> String.length) > 2 then
        characters
            |> List.map (\c -> calculateCharacterSearchWeight searchString c)
            |> List.sortBy Tuple.first
            |> List.reverse
            |> List.take maxNumberOfResults
            |> List.map Tuple.second

    else
        List.take maxNumberOfResults characters


calculateCharacterSearchWeight : String -> LordOfTheRingsCharacter -> ( Int, LordOfTheRingsCharacter )
calculateCharacterSearchWeight searchString lordOfTheRingsCharacter =
    let
        normalizedSearchString =
            searchString |> String.trim |> String.toLower
    in
    case lordOfTheRingsCharacter of
        LordOfTheRingsCharacter name description lordOfTheRingsRace ->
            let
                weight =
                    List.length (String.indexes normalizedSearchString (name |> String.trim |> String.toLower))
                        + List.length (String.indexes normalizedSearchString (description |> String.trim |> String.toLower))
                        + List.length (String.indexes normalizedSearchString (raceToString lordOfTheRingsRace |> String.trim |> String.toLower))
            in
            ( weight, lordOfTheRingsCharacter )


getRace : LordOfTheRingsCharacter -> LordOfTheRingsRace
getRace lordOfTheRingsCharacter =
    case lordOfTheRingsCharacter of
        LordOfTheRingsCharacter _ _ lordOfTheRingsRace ->
            lordOfTheRingsRace


raceToString : LordOfTheRingsRace -> String
raceToString lordOfTheRingsRace =
    case lordOfTheRingsRace of
        Dwarf ->
            "Dwarf"

        Elf ->
            "Elf"

        Hobbit ->
            "Hobbit"

        Human ->
            "Human"

        Maiar ->
            "Maiar"


characterToOption : LordOfTheRingsCharacter -> Html msg
characterToOption lordOfTheRingsCharacter =
    case lordOfTheRingsCharacter of
        LordOfTheRingsCharacter name description _ ->
            let
                maybeDescription =
                    if String.length description > 0 then
                        Just description

                    else
                        Nothing
            in
            makeOptionElement name name maybeDescription
