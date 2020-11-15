import tkinter as tr
from tkinter import filedialog, Text

import os

#Create the Root the Frame To which the Components will attach to
root=tr.Tk()
apps=[]

#Saving the
if os.path.isfile('save.txt'):
    with open('save.txt') as f:
        tempApps=f.read()
        #print(tempApps)
        tempApps=tempApps.split(',')
        apps=[x for x in tempApps if x.strip()]#to remove spaces
#navigate file directory and add files we need to open
def addApp():
    #to Empty the Frame To Avoid Duplication of the Label.
    for widget in frame.winfo_children():
        widget.destroy()
    filename=filedialog.askopenfilename(initialdir='/',title="Select File",
                                        filetypes=(("Executables", "*.exe"),("All files","*.*")))#*.exe means every file with exe extension
    apps.append(filename)
    print(filename)
    for app in apps:
        #create Label  and Attach it to frame for the Selected File/Software
        label=tr.Label(frame,text=app,bg="gray")
        label.pack()



#Run Apps
def runApps():
    for app in apps:
        os.startfile(app)



#Resizing Our Primary GUI Window via tkinter.Canvas(specify where u want to attach the canvas)
canvas=tr.Canvas(root,height=600,width=500,bg='lightpink')
canvas.pack()#to attach the root and canvas via .pack() method

#attaching Divs/Container to the canvas
#We do this by creating a frames
frame=tr.Frame(root,bg='white')
frame.place(relwidth=0.6,relheight=0.7,relx=0.2,rely=0.1)


#adding button
openfile=tr.Button(root,text="Add Executables/Apps/Files/Software",padx=6,
                   pady=2,fg='white',bg='red' ,command=addApp)
openfile.pack()

#to run apps
runApps=tr.Button(root,text="Run Them ALL",padx=6,pady=2,fg='white',bg='red',command=runApps)
runApps.pack()

#to Initialize Before the main Loop , Previous Selected Files by the user
for app in apps:
    label=tr.Label(frame,text=app)
    label.pack()

#to Run Your Python GUI
root.mainloop()

#Saving User Selection For Future References
with open('save.txt','w') as f:
    for app in apps:
        f.write(app+',')
