import statistics as stat
import sys

if len(sys.argv) != 2:
	print("Usage: python3 filter_csv.py <file_name>. Expected 1 argument but given {}".format(len(sys.argv) - 1))

f = open(sys.argv[1], 'r')
data = f.readlines()
f.close()

# Get Columns
columns = []

for rows in data:
	rows.strip('\n')
	columns.append(rows.split(','))

num_columns = len(columns[0])

columns = [ [rows[i] for rows in columns] for i in range(0, num_columns) ]

# Categorize values 

newcol = []
for col in columns:
	if col[0] == "weight_kg":
		base = round(stat.mean( [ x for x in map(int, col[1:]) if x != -1 ] ) + 1, -1) - 40
		categorized = [ round(( int(x) - base) / 10) for x in col[1:] ]
		categorized[:] = [ 1 if x < 0 else x + 2 for x in categorized ]
		categorized[:] = [ 10 if x > 10 else x for x in categorized ]
		categorized[:] = [ -1 if str(col[i]) == -1 else categorized[i] for i in range(1, len(data) - 1) ]
		to_app = [ "weight_kg" ]
		to_app.extend(categorized)
		newcol.append( to_app )

	elif col[0] == "height_cm":
		base = round(stat.mean( [ x for x in map(int, col[1:]) if x != -1 ] ) + 1, -2) - 2000
		categorized = [ round(( int(x) - base) / 500) for x in col[1:] ]
		categorized[:] = [ 1 if x < 0 else x + 2 for x in categorized ]
		categorized[:] = [ 10 if x > 10 else x for x in categorized ]
		categorized[:] = [ -1 if int(col[i]) == -1 else categorized[i] for i in range(1, len(data) - 1) ]
		to_app = [ "height_cm" ]
		to_app.extend( categorized )
		newcol.append( to_app )
		
	else:
		newcol.append(col)

# Convert from columns to rows

f = open('categorized.csv', 'w')
for lines in newcol:
	f.write( '{}\n'.format(','.join( map(str, lines))))
f.close()
