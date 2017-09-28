class QuestionOne
{
    public static void main(String[] args)
     {
      System.out.println("  \\/");
      System.out.println(" \\\\//");
      System.out.println("\\\\\\///");
      System.out.println("///\\\\\\");
      System.out.println(" //\\\\");
      System.out.println("  /\\");
      System.out.println("\nAll done!");   
     }
}

//----------------------------------------------------------
import java.util.Scanner;

class QuestionTwo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String instructor;        
        String student;
        String food;
        double someNumber = 0;
        String someProp;
        String someColor;
        String someAnimal;       
        
        System.out.println("Plaese enter first or last name of your instructor: ");
        instructor = input.next();

        System.out.println("Plaese enter a yummy food: ");
        food = input.next();

        System.out.println("Please enter your name : ");
        student= input.next(); 
        
        System.out.println("Please enter some number for fever's temp : ");
        someNumber = input.nextDouble(); 

        System.out.println("Please enter some adjective : ");
        someProp = input.next(); 

        System.out.println("Please enter some color : ");
        someColor = input.next(); 

        System.out.println("Please enter some animal : ");
        someAnimal = input.next(); 

        System.out.println("Dear professor " 
        + instructor + " ,\n \nI am sorry that I am unable to turn in my computer assignment at this time. First, \nI ate a rotten " 
        + food + " which made me turn " 
        + someColor + " and extremely ill. I came down \nwith a fever of " 
        + someNumber + ". Next my " 
        + someProp + " pet "  
        + someAnimal + " must have smelled the \nremains of " 
        + food + " on my USB key (which is where my program was stored) \nbecause he ate it. \nI am currently rewriting my programs and hope you will accept my assignment late. \n\nSincerely, " 
        + student);
  
    }
}

//----------------------------------------------------------------------
immport java.util.Scanner;

class QuestionThree {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String greet;    
        
        System.out.println("Hi, enter more than one word please: ");
        greet = input.nextLine();
        String[] greetSplit = greet.split("\\s+"); //regex
        String stringOne = greetSplit[0];
        String stringTwo = greetSplit[1];

        System.out.println("First word enterd was: "  + stringOne);
        System.out.println("It has a length of : " + stringOne.length() + " characters");
        System.out.println("The first letter is: " + stringOne.substring(0, 1));
        System.out.println("The last letter is: "  + stringOne.substring(stringOne.length() - 1));

        System.out.println("\n");

        System.out.println("Second word enterd was: "  + stringTwo);
        System.out.println("It has a length of : " + stringTwo.length() + " characters");
        System.out.println("The first letter is: " + stringTwo.substring(0, 1));
        System.out.println("The last letter is: "  + stringTwo.substring(stringTwo.length() - 1));

        String recombinedOne = stringTwo.substring(stringTwo.length() - 1) 
        + stringOne.substring(1, stringOne.length()) 
        + stringTwo.substring(0, 1);

        String recombinedTwo = stringOne.substring(stringOne.length() - 1) 
        + stringTwo.substring(1, stringTwo.length()) 
        + stringOne.substring(0, 1);

        System.out.println("Recombined words: " + recombinedOne + " " + recombinedTwo);

        System.out.println("Thanks for stopping by, take care!");
        
        
    }
}
