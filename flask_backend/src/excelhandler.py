import pandas as pd
import os

class ExcelHandler:
    def __init__(self):
        self.folder_path = "flask_backend/src/data/"
        self.required_columns = ['date', 'description', 'withdrawals', 'deposits', 'balance']
    
    def getFiles(self):
        """
        Function to get the files from the folder
        Inputs:
            None
        Outputs:
            List of files
        """
        files = os.listdir(self.folder_path)
        files = [
            os.path.join(self.folder_path, f) for f in files 
            if (f.endswith(".xlsx") or f.endswith(".xls")) and os.path.isfile(os.path.join(self.folder_path, f))
        ]
        return files
    
    def validateExcel(self, file):
        """
        Function to validate the excel file
        Inputs:
            file -> str
        Outputs:
            boolean value
        """
        data = pd.read_excel(file)
        columns = data.columns
        columns = [column.lower() for column in columns]
        for column in self.required_columns:
            if column not in columns:
                return False
        return True
    
    def getData(self, file):
        """
        Function to get the data from the excel file
        Inputs:
            file -> str
        Outputs:
            data -> dict
        """
        data = pd.read_excel(file)
        data.columns = [column.lower() for column in data.columns]
        data = data[self.required_columns]
        return data
    
    def delete_files(self, folder_path):
        """
        Function to delete the files from the folder
        Inputs:
            folder_path -> str
        Outputs:
            None
        """
        files = os.listdir(folder_path)
        for file in files:
            os.remove(os.path.join(folder_path, file))
        
    def get_json(self):
        """
        Function to convert the excel file to json
        Inputs:
            None
        Outputs:
            json data
        """
        files = self.getFiles()
        data = pd.DataFrame()
        incorrect = 0
        for file in files:
            if self.validateExcel(file):
                data = pd.concat([data, self.getData(file)])
            else:
                incorrect += 1
        if incorrect > 0:
            print(f"{incorrect} files are incorrect")
            
        data.drop_duplicates(inplace = True)                   # checking for multiple same entries
        data.fillna(0, inplace = True)                         # filling the null values with 0
        data = data.to_dict(orient = 'records')
        self.delete_files(self.folder_path)                    # deleting the files after reading
        
        return data
        