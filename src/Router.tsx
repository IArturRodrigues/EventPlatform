import { Route, Routes } from "react-router-dom";
import { Event } from "./screens/Event";
import { Subscription } from "./screens/Subscription";

// assim como na api os parametros dinamicos de uma url sao passados com :nomeDoParametro
// para utilizar esse parametro precisa do hook useParams sendo utilizado no component especificado no element (nao necessariamente, no caso do Event o useParams poderia estar sendo utilizado no componente Video [como? pesquiso depois])

export function Router() {
   return(
      <Routes>
         <Route path="/" element={<Subscription />} />
         <Route path="/event" element={<Event />} />
         <Route path="/event/lessons/:slug" element={<Event />} />
      </Routes>
   )
}