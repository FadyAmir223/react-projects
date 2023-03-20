import { ChangeEvent, FormEvent, useState } from 'react';

const data = [
  'Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut. Carrot cake caramels pie sweet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake dragée pie.',

  'Next level tbh everyday carry, blog copper mug forage kitsch roof party pickled hammock kale chips tofu. Etsy shoreditch 8-bit microdosing, XOXO viral butcher banh mi humblebrag listicle woke bicycle rights brunch before they sold out ramps. Twee shabby chic taiyaki flannel, enamel pin venmo vape four loko. Hexagon kale chips typewriter kitsch 8-bit organic plaid small batch keffiyeh ethical banh mi narwhal echo park cronut.',

  'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.',

  "Cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers kitty power ignore the squirrels, you'll never catch them anyway for what a cat-ass-trophy! or purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table. Pretend you want to go out but then don't bite off human's toes, yet disappear for four days and return home with an expensive injury; bite the vet so catch eat throw up catch eat throw up bad birds.",

  "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! Anyhoo, your net-suits will allow you to experience Fry's worm infested bowels as if you were actually wriggling through them. I just told you! You've killed me! Fry! Quit doing the right thing, you jerk! Michelle, I don't regret this, but I both rue and lament it. Morbo can't understand his teleprompter because he forgot how you say that letter that's shaped like a man wearing a hat.",

  'Airedale hard cheese mozzarella. Pecorino melted cheese port-salut emmental babybel cheese and wine melted cheese manchego. Everyone loves blue castello everyone loves fromage cheese slices airedale cheddar cream cheese. Bavarian bergkase who moved my cheese halloumi port-salut gouda jarlsberg ricotta rubber cheese. Stinking bishop smelly cheese brie.',

  "Salvia glossier subway tile, leggings mustache YOLO semiotics chia. Pitchfork tbh af blog church-key meggings vaporware PBR&B master cleanse post-ironic man bun pabst mustache letterpress synth. Snackwave raw denim godard, 3 wolf moon shaman offal kitsch unicorn live-edge selvage schlitz fashion axe vaporware drinking vinegar prism. Shabby chic tacos artisan, chambray chicharrones cardigan leggings typewriter af pop-up williamsburg meditation PBR&B viral. You probably haven't heard of them DIY jean shorts subway tile fashion axe bushwick kitsch tumeric cloud bread vaporware freegan franzen pork belly chicharrones banh mi.",

  'Man braid celiac synth freegan readymade, pitchfork fam salvia waistcoat lomo bitters gentrify four loko. Pitchfork semiotics post-ironic vegan. Tofu meditation microdosing hashtag semiotics venmo. Flexitarian vape tilde taiyaki. Prism poutine farm-to-table, messenger bag vegan taxidermy tattooed sartorial squid jean shorts fixie selvage trust fund vape.',
];

const LoremIpsum = () => {
  const min = 1,
    max = 8;

  const [currNum, setCurrNum] = useState(1);
  const [dataSlice, setDataSlice] = useState('0');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextNum = +e.target.value;
    if (nextNum >= min && nextNum <= max) setCurrNum(nextNum);
  };

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDataSlice(e.target.elements.namedItem('paragraphs').value);
  };

  return (
    <main className="flex items-center h-full">
      <article className="bg-stale-900 w-full h-full">
        <section className="container mx-auto p-10">
          <h2 className="text-center text-2xl uppercase mb-4">
            tired of lorem ipsum?
          </h2>

          <form
            className="flex justify-center gap-x-2 mb-10"
            onSubmit={handlesubmit}
          >
            <span className="capitalize">paragraphs:</span>
            <input
              type="number"
              name="paragraphs"
              id=""
              min={min}
              max={max}
              step="1"
              className="pl-2 text-lg"
              value={currNum}
              onChange={handleInputChange}
            />
            <button className="px-2 py-1 capitalize bg-green-600 duration-200 hover:bg-green-900 rounded-md">
              generate
            </button>
          </form>

          <div>
            {
              // /* {generate !== 0 && */
              data.slice(0, dataSlice).map((i) => (
                <div key={i} className="mb-6 text-stone-800">
                  <p className="text-gray-200 leading-7">{i}</p>
                </div>
              ))
            }
          </div>
        </section>
      </article>
    </main>
  );
};

export default LoremIpsum;
