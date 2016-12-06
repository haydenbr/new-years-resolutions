export class QuoteModel {
  private readonly quotes: string[] = [
    'Character is the ability to carry out a good resolution long after the excitement of the moment has passed. - Cavett Robert',
    'Always bear in mind that your own resolution to succeed is more important than any other. - Abraham Lincoln',
    'If you asked me for my New Year Resolution, it would be to find out who I am. - Cyril Cusack',
    'New Year\'s Resolution: To tolerate fools more gladly, provided this does not encourage them to take up more of my time. - James Agate',
    'How few there are who have courage enough to own their faults, or resolution enough to mend them. - Benjamin Franklin',
    'Cheers to a new year and another chance for us to get it right. - Oprah Winfrey',
    'In order to succeed, we must first believe that we can. - Nikos Kazantzakis',
    'If you can dream it, you can do it. - Walt Disney',
    'It always seems impossible until it\'s done. - Nelson Mandela',
    'It does not matter how slowly you go as long as you do not stop. - Confucius',
    'Keep your eyes on the stars, and your feet on the ground. - Theodore Roosevelt',
    'A creative man is motivated by the desire to achieve, not by the desire to beat others. - Ayn Rand',
    'The secret of getting ahead is getting started. - Mark Twain',
    'Quality is not an act, it is a habit. - Aristotle',
    'The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence. - Confucius'
  ];

  get() {
    return this.quotes;
  }
}
