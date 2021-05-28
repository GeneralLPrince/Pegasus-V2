module.exports = {
	name: 'verify',
	description: 'Verification command',
	execute(message,firebase,client,nbx,Discord,PlayerDM,playerMessage,database) {
        var refDiscord = database.ref("Verifications/Discord");
            var DiscordusersRef = refDiscord.child(PlayerDM.id);

            const Channel = message.channel

            var ref = firebase.database().ref("Verifications/Discord/")
            ref.once("value")
            .then(function(snapshot) {
            var isVerified = snapshot.child(PlayerDM.id).hasChildren()            

            if (isVerified == false) {
                Channel.send({
				embed: {
					"type": "rich",
					"color": 3092790,
					"title": "Verification",
					"description": "What's your Roblox username?\n\n Say **cancel** to cancel the verification.",
					footer: {
						"text": "This prompt will automatically cancel in 3 minutes.",
                    },
                }
            }).then(dmMessage => {
                const filter = m => m.author.id ===  message.author.id;
                dmMessage.channel.awaitMessages(filter, {
                    max: 1,
                    time: 180000,
                }).then(async(collected) => {
                    if (collected.first().content == "cancel") {
                        return dmMessage.send("Verification cancelled")
                    }

                    const verifyPlayer = collected.first().content 
                    const userId = await nbx.getIdFromUsername(verifyPlayer).catch(e => "UNF"); 

                    if (userId == "UNF") {
                        return Channel.send({
                            embed: {
                              "type": "rich",
                              "color": 3092790,
                              "title": "Verification Failed",
                              "description": "We couldn't find your Roblox account, are you sure you typed out your username correctly? Please verify again.",
                            }
                        })
                    }
                    var verbs = ["accelerator", "accordion", "account", "accountant", "acknowledgment", "acoustic", "acrylic", "act", "action", "active", "activity", "actor", "actress", "adapter", "addition", "address", "adjustment", "adult", "advantage", "advertisement", "advice", "afghanistan", "africa", "aftermath", "afternoon", "aftershave", "afterthought", "age", "agenda", "agreement", "air", "airbus", "airmail", "airplane", "airport", "airship", "alarm", "albatross", "alcohol", "algebra", "algeria", "alibi", "alley", "alligator", "alloy", "almanac", "alphabet", "alto", "aluminium", "aluminum", "ambulance", "america", "amount", "amusement", "anatomy", "anethesiologist", "anger", "angle", "angora", "animal", "anime", "ankle", "answer", "ant", "antarctica", "anteater", "antelope", "anthony", "anthropology", "apartment", "apology", "apparatus", "apparel", "appeal", "appendix", "apple", "appliance", "approval", "april", "aquarius", "arch", "archaeology", "archeology", "archer", "architecture", "area", "argentina", "argument", "aries", "arithmetic", "arm", "armadillo", "armchair", "armenian", "army", "arrow", "art", "ash", "ashtray", "asia", "asparagus", "asphalt", "asterisk", "astronomy", "athlete", "atm", "atom", "attack", "attempt", "attention", "attic", "attraction", "august", "aunt", "australia", "australian", "author", "authorisation", "authority", "authorization", "avenue", "babies", "baboon", "baby", "back", "backbone", "bacon", "badge", "badger", "bag", "bagel", "bagpipe", "bail", "bait", "baker", "bakery", "balance", "balinese", "ball", "balloon", "bamboo", "banana", "band", "bandana", "bangladesh", "bangle", "banjo", "bank", "bankbook", "banker", "bar", "barbara", "barber", "barge", "baritone", "barometer", "base", "baseball", "basement", "basin", "basket", "basketball", "bass", "bassoon", "bat", "bath", "bathroom", "bathtub", "battery", "battle", "bay", "beach", "bead", "beam", "bean", "bear", "beard", "beast", "beat", "beautician", "beauty", "beaver", "bed", "bedroom", "bee", "beech", "beef", "beer", "beet", "beetle", "beggar", "beginner", "begonia", "behavior", "belgian", "belief", "believe", "bell", "belt", "bench", "bengal", "beret", "berry", "bestseller", "betty", "bibliography", "bicycle", "bike", "bill", "billboard", "biology", "biplane", "birch", "bird", "birth", "birthday", "bit", "bite", "black", "bladder", "blade", "blanket", "blinker", "blizzard", "block", "blood", "blouse", "blow", "blowgun", "blue", "board", "boat", "bobcat", "body", "bolt", "bomb", "bomber", "bone", "bongo", "bonsai", "book", "bookcase", "booklet", "boot", "border", "botany", "bottle", "bottom", "boundary", "bow", "bowl", "bowling", "box", "boy", "bra", "brace", "bracket", "brain", "brake", "branch", "brand", "brandy", "brass", "brazil", "bread", "break", "breakfast", "breath", "brian", "brick", "bridge", "british", "broccoli", "brochure", "broker", "bronze", "brother", "brother-in-law", "brow", "brown", "brush", "bubble", "bucket", "budget", "buffer", "buffet", "bugle", "building", "bulb", "bull", "bulldozer", "bumper", "bun", "burglar", "burma", "burn", "burst", "bus", "bush", "business", "butane", "butcher", "butter", "button", "buzzard", "c-clamp", "cabbage", "cabinet", "cable", "cactus", "cafe", "cake", "calculator", "calculus", "calendar", "calf", "call", "camel", "camera", "camp", "can", "canada", "canadian", "cancer", "candle", "cannon", "canoe", "canvas", "cap", "capital", "cappelletti", "capricorn", "captain", "caption", "car", "caravan", "carbon", "card", "cardboard", "cardigan", "care", "carnation", "carol", "carp", "carpenter", "carriage", "carrot", "cart", "cartoon", "case", "cast", "castanet", "cat", "catamaran", "caterpillar", "cathedral", "catsup", "cattle", "cauliflower", "cause", "caution", "cave", "cd", "ceiling", "celery", "celeste", "cell", "cellar", "cello", "celsius", "cement", "cemetery", "cent", "centimeter", "century", "ceramic", "cereal", "certification", "chain", "chair", "chalk", "chance", "change", "channel", "character", "chard", "charles", "chauffeur", "check", "cheek", "cheese", "cheetah", "chef", "chemistry", "cheque", "cherries", "cherry", "chess", "chest", "chick", "chicken", "chicory", "chief", "child", "children", "chill", "chime", "chimpanzee", "chin", "china", "chinese", "chive", "chocolate", "chord", "christmas", "christopher", "chronometer", "church", "cicada", "cinema", "circle", "circulation", "cirrus", "citizenship", "city", "clam", "clarinet", "class", "claus", "clave", "clef", "clerk", "click", "client", "climb", "clipper", "cloakroom", "clock", "close", "closet", "cloth", "cloud", "cloudy", "clover", "club", "clutch", "coach", "coal", "coast", "coat", "cobweb", "cockroach", "cocktail", "cocoa", "cod", "coffee", "coil", "coin", "coke", "cold", "collar", "college", "collision", "colombia", "colon", "colony", "color", "colt", "column", "columnist", "comb", "comfort", "comic", "comma", "command", "commission", "committee", "community", "company", "comparison", "competition", "competitor", "composer", "composition", "computer", "condition", "condor", "cone", "confirmation", "conga", "congo", "conifer", "connection", "consonant", "continent", "control", "cook", "cooking", "copper", "copy", "copyright", "cord", "cork", "cormorant", "corn", "cornet", "correspondent", "cost", "cotton", "couch", "cougar", "cough", "country", "course", "court", "cousin", "cover", "cow", "cowbell", "crab", "crack", "cracker", "craftsman", "crate", "crawdad", "crayfish", "crayon", "cream", "creator", "creature", "credit", "creditor", "creek", "crib", "cricket", "crime", "criminal", "crocodile", "crocus", "croissant", "crook", "crop", "cross", "crow", "crowd", "crown", "crush", "cry", "cub", "cuban", "cucumber", "cultivator", "cup", "cupboard", "cupcake", "curler", "currency", "current", "curtain", "curve", "cushion", "custard", "customer", "cut", "cuticle", "cycle", "cyclone", "cylinder", "cymbal", "dad", "daffodil", "dahlia", "daisy", "damage", "dance", "dancer", "danger", "daniel", "dash", "dashboard", "database", "date", "daughter", "david", "day", "dead", "deadline", "deal", "death", "deborah", "debt", "debtor", "decade", "december", "decimal", "decision", "decrease", "dedication", "deer", "defense", "deficit", "degree", "delete", "delivery", "den", "denim", "dentist", "deodorant", "department", "deposit", "description", "desert", "design", "desire", "desk", "dessert", "destruction", "detail", "detective", "development", "dew", "diamond", "diaphragm", "dibble", "dictionary", "dietician", "difference", "digestion", "digger", "digital", "dill", "dime", "dimple", "dinghy", "dinner", "dinosaur", "diploma", "dipstick", "direction", "dirt", "disadvantage", "discovery", "discussion", "disease", "disgust", "dish", "distance", "distribution", "distributor", "diving", "division", "divorced", "dock", "doctor", "dog", "dogsled", "doll", "dollar", "dolphin", "domain", "donald", "donkey", "donna", "door", "dorothy", "double", "doubt", "downtown", "dragon", "dragonfly", "drain", "drake", "drama", "draw", "drawbridge", "drawer", "dream", "dredger", "dress", "dresser", "dressing", "drill", "drink", "drive", "driver", "driving", "drizzle", "drop", "drug", "drum", "dry", "dryer", "duck", "duckling", "dugout", "dungeon", "dust", "eagle", "ear", "earth", "earthquake", "ease", "east", "edge", "edger", "editor", "editorial", "education", "edward", "eel", "effect", "egg", "eggnog", "eggplant", "egypt", "eight", "elbow", "element", "elephant", "elizabeth", "ellipse", "emery", "employee", "employer", "encyclopedia", "end", "enemy", "energy", "engine", "engineer", "engineering", "english", "enquiry", "entrance", "environment", "epoch", "epoxy", "equinox", "equipment", "era", "error", "estimate", "ethernet", "ethiopia", "euphonium", "europe", "evening", "event", "ex-husband", "ex-wife", "examination", "example", "exchange", "exclamation", "exhaust", "existence", "expansion", "experience", "expert", "explanation", "eye", "eyebrow", "eyelash", "eyeliner", "face", "facilities", "fact", "factory", "fahrenheit", "fairies", "fall", "family", "fan", "fang", "farm", "farmer", "fat", "father", "father-in-law", "faucet", "fear", "feast", "feather", "feature", "february", "fedelini", "feedback", "feeling", "feet", "felony", "female", "fender", "ferry", "ferryboat", "fertilizer", "fiber", "fiberglass", "fibre", "fiction", "field", "fifth", "fight", "fighter", "file", "find", "fine", "finger", "fir", "fire", "fired", "fireman", "fireplace", "firewall", "fish", "fisherman", "flag", "flame", "flare", "flat", "flavor", "flax", "flesh", "flight", "flock", "flood", "floor", "flower", "flugelhorn", "flute", "fly", "foam", "fog", "fold", "font", "food", "foot", "football", "footnote", "force", "forecast", "forehead", "forest", "forgery", "fork", "form", "format", "fortnight", "foundation", "fountain", "fowl", "fox", "foxglove", "fragrance", "frame", "france", "freckle", "freeze", "freezer", "freighter", "french", "freon", "friction", "friday", "fridge", "friend", "frog", "front", "frost", "frown", "fruit", "fuel", "fur", "furniture", "galley", "gallon", "game", "gander", "garage", "garden", "garlic", "gas", "gasoline", "gate", "gateway", "gauge", "gazelle", "gear", "gearshift", "geese", "gemini", "gender", "geography", "geology", "geometry", "george", "geranium", "german", "germany", "ghana", "ghost", "giant", "giraffe", "girdle", "girl", "gladiolus", "glass", "glider", "gliding", "glockenspiel", "glove", "glue", "goal", "goat", "gold", "goldfish", "golf", "gondola", "gong", "good-bye", "goose", "gore-tex", "gorilla", "gosling", "government", "governor", "grade", "grain", "gram", "granddaughter", "grandfather", "grandmother", "grandson", "grape", "graphic", "grass", "grasshopper", "gray", "grease", "great-grandfather", "great-grandmother", "greece", "greek", "green", "grenade", "grey", "grill", "grip", "ground", "group", "grouse", "growth", "guarantee", "guatemalan", "guide", "guilty", "guitar", "gum", "gun", "gym", "gymnast", "hacksaw"]
                                
                    var randVerbs = verbs[Math.floor(Math.random() * verbs.length)] + " and " + verbs[Math.floor(Math.random() * verbs.length)] + " and " + verbs[Math.floor(Math.random() * verbs.length)] + " and " + verbs[Math.floor(Math.random() * verbs.length)] + " and " + verbs[Math.floor(Math.random() * verbs.length)] + " and " + verbs[Math.floor(Math.random() * verbs.length)] + " and " + verbs[Math.floor(Math.random() * verbs.length)] + " and " + verbs[Math.floor(Math.random() * verbs.length)];

                    const key = randVerbs

                    if (userId !== "UNF") {
                        const username = await nbx.getUsernameFromId(userId)
                        dmMessage.channel.send({
                            embed: {
                                "type": "rich",
                                "color": 3092790,
                                "image": {
                                    "url": "https://media.discordapp.net/attachments/770327789550567424/770641327615508500/35a120ab15f747403b42f23c429cbce1.png"
                                  },
                                  "description": "Put the following key in your status like in the screenshot and reply with **done** or **cancel**.\n ```"+key+"```", 
                                  footer: {
                                      "text": "",            
                                    }
                                }
                            }).then(dmMessage => {
                                const filter = m => m.author.id ===  message.author.id;
                                dmMessage.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 180000,
                                }).then(async(collected) => {
                                    if (collected.first().content.toLowerCase()  == "cancel") {
                                        return dmMessage.channel.send("Verification cancelled")
                                    }

                                    if (collected.first().content.toLowerCase() == "done") {
                                        collected.first().react('763817429792456744')
                                        const getPlayerInfo = await nbx.getPlayerInfo({userId: userId})
                                        const getPlayerBlurb = getPlayerInfo.blurb

                                        collected.first().reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                        if (getPlayerBlurb == key) {
                                            var discordId = PlayerDM.id

                                            DiscordusersRef.set({
                                                UserID: userId
                                             });

                                            var refRoblox = database.ref("Verifications/Roblox");
                                            var RobloxusersRef = refRoblox.child(userId);
                                            RobloxusersRef.set({
                                                DiscordID: discordId,
                                            });

                                            const username = await nbx.getUsernameFromId(userId)
                                            message.member.setNickname(username)

                                            return dmMessage.channel.send({
                                                embed: {
                                                  "type": "rich",
                                                  "color": 3092790,
                                                  "title": "Verification successful",
                                                  "description": "You will be roled and nicknamed to your ROBLOX username shortly. If this doesn't occur, please run !verify again in #verification.",
                                                }
                                            })
                                        } else {
                                            return dmMessage.channel.send({
                                                embed: {
                                                  "type": "rich",
                                                  "color": 3092790,
                                                  "title": "Verification Failed",
                                                  "description": "Your ROBLOX status doesn't match the key provided. Please run !verify again in #verification to reverify.",
                                                }
                                            })
                                        }
                                    }
                                })
                            })
                        }
                    })
                })
               } else if (isVerified == true) {
                   var ref1 = firebase.database().ref("Verifications/Discord/"+PlayerDM.id+"/UserID")
                   ref1.once("value", function(snapshot) {

                   async function exec(UserID) {
                       const username = await nbx.getUsernameFromId(UserID)
                       message.member.setNickname(username)
                       Channel.send({
                        embed: {
                            "type": "rich",
                            "color": 3092790,
                            "title": "Verification successful",
                            "description": "You will be roled and nicknamed to your ROBLOX username shortly. If this doesn't occur, please run !verify again in #verification.",
                         }
                     })
                   }
                   exec(snapshot.val())
                })
                }            
            })   
        }   
    }
