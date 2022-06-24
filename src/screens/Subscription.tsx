import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

// a exclamacao depois do tipo significa que eh um parametro obrigatorio
const CREATE_SUBSCRIBER_MUTATION = gql`
   mutation CreateSubscriber ($name: String!, email: String!) {
      createSubscriber(data: {name: $name, email: $email}) {
         id
      }
   }
`;

export function Subscription() {
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   // o useMutation devolve um array em que a primeira posicao retorna a funcao de criacao de usuario
   // no segundo e o retorno dos dados criados a partir dessa mutation
   const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

   async function handlerSubscription(event: FormEvent) {
      event.preventDefault();

      await createSubscriber({
         variables: {
            name,
            email
         }
      });

      navigate('/event');
   }

   return(
      <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
         <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
            <div className="max-w-[640px]">
               <Logo />

               <h1 className="mt-8 text-[2.5rem] leading-tight">
                  Construa uma <strong className="text-blue-500">aplicacao completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
               </h1>
               <p className="mt-4 text-gray-200 leading-relaxed">
                  Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
               </p>
            </div>

            <div className="p-8 bg-gray-700 border border-gray-500 rounded">
               <strong>Inscreva-s gratuitamente</strong>

               <form onSubmit={handlerSubscription} className="flex flex-col gap-2 w-full">
                  <input 
                     className="bg-gray-900 rounded px-5 h-14"
                     type="text" 
                     placeholder="Seu nome completo" 
                     onChange={event => setName(event.target.value)}
                  />
                  <input 
                     className="bg-gray-900 rounded px-5 h-14"
                     type="email" 
                     placeholder="Digite seu e-mail" 
                     onChange={event => setEmail(event.target.value)}
                  />

                  <button 
                     type="submit"
                     disabled={loading}
                     className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                     Garantir minha vaga
                  </button>
               </form>
            </div>
         </div>

         <img src="/src/assets/imgs/code-mockup.png" className="=mt-10" alt="" />
      </div>
   )
}

// useNavigate serve para redirecionar o usuario para outra tela sem que ele precise clicar em algum link

// fazer cadastros utilizando o cms eh recomendado usar uma api de intermedio e nao fazer direto do front end como sera feito aqui
// no cms tem Public content API que eh recomendado ser utilizada somente para leitura de dados
// para fazer escrita de dados o recomendado eh criar um token no Permanent Auth Token
// caso de algum erro pode ser pq a unica opcao de leitura seja de models published e nao dos drafts tambem
// para fazer do jeito certo precisaria de 2 mutations, uma para criar e a outra para publicar(publish) ja que por padrao ele deixa apenas como rascunho (draft)