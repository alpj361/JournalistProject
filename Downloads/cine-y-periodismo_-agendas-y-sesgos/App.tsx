import React from 'react';
import { Clapperboard, ScrollText, AlertTriangle, Lightbulb, ShieldAlert, Tv, Newspaper, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { FadeIn } from './components/FadeIn';
import { FlipCard } from './components/FlipCard';
import { ThemesChart, CategoryPieChart, ThematicRadarChart, TimelineChart, StatsCards } from './components/Charts';
import { topCharacters, censorshipItems, impactData, realWorldImpact } from './data';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30 selection:text-amber-100 overflow-x-hidden">

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"></div>
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          {/* Abstract grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center max-w-4xl">
          <FadeIn>
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 mb-8 border border-amber-500/30 backdrop-blur-sm shadow-2xl">
              <Clapperboard className="w-10 h-10 text-amber-400" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white serif">
              Cine, Periodismo <br /> <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">y Agendas</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              "Las películas significan para mí una diversidad de sesgos. ¿Hasta dónde pueden adoctrinar?"
            </p>
          </FadeIn>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-widest">Desplazarse</span>
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-7xl space-y-32">

        {/* Intro Text */}
        <section className="prose prose-lg prose-invert mx-auto max-w-4xl">
          <FadeIn>
            <p className="text-xl leading-relaxed text-slate-300 first-letter:text-6xl first-letter:font-serif first-letter:text-amber-500 first-letter:mr-4 first-letter:float-left first-letter:leading-none">
              Con el pasar de los años, hemos visto cómo las películas que forman parte de nuestro día a día son parte de una búsqueda constante de agendas. Un profesor mío dijo "Ve mucho cine" y eso se me quedó, a tal punto de que, de acá en adelante, las películas significan para mí una diversidad de sesgos. Pero mi pregunta es: <strong className="text-white">¿hasta dónde pueden adoctrinar y cuáles son los datos u hechos al respecto?</strong>
            </p>
            <p className="text-slate-400 mt-6">
              Primero miremos un poco cómo el periodismo o las noticias han tenido relevancia en el cine.
            </p>
          </FadeIn>
        </section>

        {/* Category Explanation Section */}
        <section className="bg-gradient-to-br from-slate-900/80 to-slate-800/30 p-8 md:p-12 rounded-3xl border border-slate-700/50">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold serif text-white mb-8 text-center">¿Cómo interpretar las categorías?</h2>
            <p className="text-slate-400 text-center max-w-3xl mx-auto mb-10">
              En este análisis, clasificamos la representación del periodismo en el cine en tres categorías según cómo la película retrata al periodista y su rol en la sociedad:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                  <h3 className="text-xl font-bold text-white">Héroe</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  El periodista es presentado como un <span className="text-blue-300">defensor de la verdad y la democracia</span>. Expone corrupción, protege fuentes, y lucha contra la injusticia. Ejemplos: <em>Spotlight</em>, <em>All the President's Men</em>.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-red-500/30 hover:border-red-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-4 rounded-full bg-red-500"></span>
                  <h3 className="text-xl font-bold text-white">Crítica</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  La película <span className="text-red-300">critica o satiriza</span> a los medios de comunicación. Muestra cómo manipulan la verdad, priorizan el espectáculo, o sirven intereses propios. Ejemplos: <em>Citizen Kane</em>, <em>Network</em>.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-amber-500/30 hover:border-amber-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-4 rounded-full bg-amber-500"></span>
                  <h3 className="text-xl font-bold text-white">Complejo</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  El periodista es <span className="text-amber-300">moralmente ambiguo</span> o enfrenta dilemas éticos sin una respuesta clara. La película explora las zonas grises del oficio. Ejemplos: <em>Zodiac</em>, <em>La dolce vita</em>.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Context Stats */}
        <section className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-10 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          <FadeIn className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold serif text-white flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <Newspaper className="text-blue-400 w-6 h-6" />
              </div>
              La Fuente de Datos
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Este ensayo se basa en el proyecto <span className="text-white font-medium">"Periodistas en el cine"</span> de <span className="text-white font-medium">Manuel Barrientos</span> y <span className="text-white font-medium">Federico Poore</span>, una base de datos que analiza <span className="text-blue-300 font-semibold">más de 3,000 películas</span>, identificando <span className="text-amber-300 font-semibold">85 temas recurrentes</span> a lo largo de <span className="text-purple-300 font-semibold">8 décadas</span>. Esta recopilación masiva revela cómo la industria cinematográfica construye imaginarios sobre el oficio periodístico.
            </p>
            <p className="text-slate-400 text-sm italic">
              Los datos y estadísticas presentados provienen de este análisis exhaustivo, no de una investigación propia.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <CategoryPieChart />
          </FadeIn>
        </section>

        {/* Interactive Flip Cards - Characters */}
        <section>
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold serif mb-6">Personajes que Marcaron Época</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Top 10 del ranking. Haz click en las tarjetas para descubrir su relevancia y el impacto de su narrativa.
            </p>
            <div className="flex justify-center gap-8 mt-8 text-sm">
              <span className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/30">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Héroe
              </span>
              <span className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/30">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                Complejo
              </span>
              <span className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/30">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Crítica
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {topCharacters.map((char, index) => (
              <FadeIn key={char.id} delay={index * 100}>
                <FlipCard movie={char} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <FadeIn className="text-center mb-16">
            <div className="inline-block p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 mb-6">
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold serif mb-6">Visualización de Datos</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Análisis interactivo de los temas, categorías y tendencias en el cine periodístico.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <FadeIn>
              <ThemesChart />
            </FadeIn>
            <FadeIn delay={200}>
              <ThematicRadarChart />
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <TimelineChart />
          </FadeIn>
        </section>

        {/* Censorship Section */}
        <section className="grid lg:grid-cols-2 gap-12">
          <FadeIn className="bg-gradient-to-br from-red-950/30 to-red-900/10 p-10 rounded-3xl border border-red-900/30 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                <ShieldAlert className="text-red-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold serif text-red-100">Censura en Pantalla</h3>
            </div>
            <p className="text-red-200/70 mb-8 text-lg">El tema "Censura" aparece 42 veces de forma prominente. Estas películas exponen los mecanismos de silencio.</p>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
              {censorshipItems.map((item, idx) => (
                <div key={idx} className="bg-red-900/10 p-5 rounded-xl border-l-4 border-red-500/60 hover:bg-red-900/20 transition-colors">
                  <h4 className="font-bold text-red-200 text-lg mb-1">{item.title}</h4>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200} className="space-y-8">
            {/* Analysis Cards */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border-l-4 border-blue-500 shadow-xl">
              <Lightbulb className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Influencia Heroica</h3>
              <p className="text-slate-400 leading-relaxed">
                Películas como <em className="text-blue-300">All the President's Men</em> y <em className="text-blue-300">Spotlight</em> han adoctrinado a las masas en una visión idealizada del periodismo investigativo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border-l-4 border-amber-500 shadow-xl">
              <Tv className="w-10 h-10 text-amber-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Crítica Sensacionalista</h3>
              <p className="text-slate-400 leading-relaxed">
                <em className="text-amber-300">Citizen Kane</em> y <em className="text-amber-300">Network</em> ilustran cómo los medios pueden crear realidad y propaganda.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border-l-4 border-red-500 shadow-xl">
              <AlertTriangle className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Temas de Censura</h3>
              <p className="text-slate-400 leading-relaxed">
                Cintas como <em className="text-red-300">Good Night, and Good Luck</em> posicionan a la prensa como antídoto a la represión estatal.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Impact Tables */}
        <section>
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block p-3 rounded-xl bg-green-500/20 border border-green-500/30 mb-6">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold serif mb-4">Impacto en el Mundo Real</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Cómo estas películas influenciaron decisiones y reformas en el mundo real.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-slate-900/50 rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-800/80">
                    <th className="p-5 text-slate-200 font-bold uppercase tracking-wider text-sm border-b border-slate-700">Película</th>
                    <th className="p-5 text-slate-200 font-bold uppercase tracking-wider text-sm border-b border-slate-700">Decisión / Impacto</th>
                    <th className="p-5 text-slate-200 font-bold uppercase tracking-wider text-sm border-b border-slate-700">Ejemplos Específicos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {realWorldImpact.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors group">
                      <td className="p-5 font-bold text-white group-hover:text-amber-300 transition-colors">{row.movie}</td>
                      <td className="p-5 text-amber-400">{row.impact}</td>
                      <td className="p-5 text-slate-400 italic">"{row.examples}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 overflow-x-auto">
              <h3 className="text-xl font-bold serif mb-6 text-slate-200 flex items-center gap-3">
                <Target className="w-5 h-5 text-purple-400" />
                Comparativa de Adoctrinamiento
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {impactData.map((row, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors group">
                    <h4 className="text-lg font-serif font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">{row.movie}</h4>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="inline-block bg-purple-500/20 px-3 py-1 rounded-full text-xs uppercase text-purple-300 font-bold mb-2">Tema</span>
                        <p className="text-slate-300">{row.impact}</p>
                      </div>
                      <div>
                        <span className="inline-block bg-blue-500/20 px-3 py-1 rounded-full text-xs uppercase text-blue-300 font-bold mb-2">Influencia</span>
                        <p className="text-slate-400 text-sm">{row.examples}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Conclusion */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 z-0"></div>
          <FadeIn className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-block p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 mb-4">
              <ScrollText className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold serif text-white">Reflexión Final</h2>

            <div className="text-lg md:text-xl text-slate-300 leading-loose space-y-8 text-left font-serif bg-slate-800/30 p-10 rounded-3xl border border-slate-700/30">
              <p>
                Como espectador muchas veces, hay autores que corren la verdad y otros que influencian. ¿Pero hasta qué punto nos deberíamos dejar influir? ¿O es que acaso la influencia también es aprendizaje y define de dónde somos o quiénes somos?
              </p>
              <p>
                Lo que vemos en pantalla funciona muy al estilo Matrix, o como simulación de conceptos, el famoso <span className="text-amber-400 italic font-bold">"¿Qué pasaría si?"</span>. Acaso esas historias moldean las expectativas que nos proponemos lograr, ¿son un avance de agendas ocultas por investigar, o incluso pueden ser un experimento de lo que puede pasar y cómo la gente reacciona a esto?
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white pt-8 border-t border-slate-700 mt-8 text-center">
                La pregunta que queda es: ¿qué vamos a dejar que sea nuestro futuro y cómo influirá en la manera en que manejamos lo que sabemos o creemos?
              </p>
            </div>
          </FadeIn>
        </section>

        <footer className="text-center text-slate-600 pb-12 text-sm border-t border-slate-800 pt-8">
          <p>© {new Date().getFullYear()} Ensayo Interactivo. Basado en datos de "Periodistas en el cine".</p>
          <p className="mt-2 text-slate-700">Portadas de películas via The Movie Database (TMDB)</p>
        </footer>

      </main>
    </div>
  );
};

export default App;