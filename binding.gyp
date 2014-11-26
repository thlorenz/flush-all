{
  "targets": [
    { 
      'target_name': 'flush_all',
      'sources': [ 
          './src/flush_all.cc',
          './flush-all.js',
        ],
        'include_dirs': [
          '<!(node -e "require(\'nan\')")',
      ],
      'conditions': [
        [ "OS == 'linux'" , {
          'cflags!': [ '-fno-tree-vrp', '-fno-tree-sink' ]
          }
        ]
      ]
    }
  ]
}
