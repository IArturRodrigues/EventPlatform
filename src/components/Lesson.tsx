import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
   title: string;
   slug: string;
   avaliableAt: Date;
   type: 'live' | 'class';
}

// no tailwind tem uma classe chamada group, essa classe tranforma elementos nao compartilhados em um grupo
// ex: tendo um hover em um dos componentes o(s) outro(s) do grupo tambem sera(ão) afetado(s) desde que a classe seja colocada como "group-hover"
// nesse caso o hover foi um exemplo mas pode ser substituido por outros tipos de eventos do css

// ao utlizar o react router dom as ancoras <a> sao substituidas por Link's
// o atributo href muda para to

export function Lesson(props: LessonProps) {
   const { slug } = useParams<{ slug: string }>();

   const isAvaliable = isPast(props.avaliableAt);
   const avaliableDateFormatted = format(props.avaliableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
      locale: ptBR
   });

   const isActiveLesson = slug == props.slug;

   return (
      <Link 
         to={`/event/lessons/${props.slug}`} className={classNames('group', {
            'pointer-events-none': !isAvaliable
            })}
      >
         <span className="text-gray-300 group">
            {avaliableDateFormatted}
         </span>
         
         <div 
            className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
               'bg-green-500': isActiveLesson,
            })}
         >
            <header className="flex items-center justify-between">
               {isAvaliable
                  ? (<span className={classNames('flex text-sm font-medium items-center gap-2', {
                     'text-white': isActiveLesson,
                     'text-blue-500': !isActiveLesson
                     })}>
                        <CheckCircle size={20} />
                        Conteudo liberado
                     </span>)
                  : (<span className="flex text-sm text-orange-500 font-medium items-center gap-2">
                        <Lock size={20} />
                        Em breve
                     </span>)
               }
               <span className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border font-bold', {
                  'border-white': isActiveLesson,
                  'border-green-300': !isActiveLesson
               })}>
                  {props.type == 'live' ? 'AO VIVO' : 'AULA PRATICA'}
               </span>
            </header>

            <strong className={classNames("block mt-5", {
               'text-white': isActiveLesson,
               'text-gray-200': !isActiveLesson
            })}>
               {props.title}
            </strong>
         </div>
      </Link>
   );
}

// usar classes condicionais com tailwind sem a lib classnames 
// {`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : ''}`}