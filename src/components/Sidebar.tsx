import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";


// forma de escrever a query sem usar o graphql-codegen {
   // import { gql, useQuery } from "@apollo/client";

   // const GET_LESSONS_QUERY = gql`
   //    query LessonsQuery {
   //       lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
   //          id
   //          lessonType
   //          availableAt
   //          title
   //          slug
   //       }
   //    }
   // `;
   
   // interface GetLessonsQueryResponse {
   //    lessons: {
   //       id: string;
   //       title: string;
   //       slug: string;
   //       avaliableAt: string;
   //       lessonType: 'live' | 'class';
   //    }[]
   // }
   // usar dentro do function component {
      // const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
   // }
// }

export function Sidebar() {
   const { data } = useGetLessonsQuery();

   return (
      <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
         <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
            Cronograma de aulas
         </span>

         <div className="flex flex-col gap-8">
            {data?.lessons.map(lesson => {
               return (
                  <Lesson 
                     key={lesson.id}
                     title={lesson.title}
                     slug={lesson.slug}
                     avaliableAt={new Date(lesson.availableAt)}
                     type={lesson.lessonType}
                  />
               )
            })}
         </div>
      </aside>
   );
}